import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

interface TransitMsg {
  salt: string;
  iv: string;
  encrypted: string;
}

@Injectable()
export class AesService {

  private readonly typePrefixes = new Map([
    [ 'string', 's' ],
    [ 'number', 'n' ],
    [ 'boolean', 'b' ]
  ]);
  private readonly typeSeperator = '.'; // Using the dot as it is url safe.

  public encrypt(message: string, password: string): string {
    const salt = forge.random.getBytesSync(16);
    const iv = forge.random.getBytesSync(16);

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = this.deriveKeyFromPassword(forge.util.encodeUtf8(password), salt);

    const cipher = forge.cipher.createCipher('AES-CBC', key);

    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(message)));
    cipher.finish();

    const encrypted = cipher.output.getBytes();
    return this.getTransitMsgStr(salt, iv, encrypted);
  }

  public decrypt(transitMsg: string, password: string): string {
    const { salt, iv, encrypted } = this.parseTransitMsg(transitMsg);
    const key = this.deriveKeyFromPassword(forge.util.encodeUtf8(password), salt);

    const decipher = forge.cipher.createDecipher('AES-CBC', key);

    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(encrypted, 'raw'));
    decipher.finish();

    return forge.util.decodeUtf8(decipher.output.getBytes());
  }

  public encryptTyped(val: string | number | boolean, password: string): string {
    if (val == null) {
      return val as string;
    }

    const prefix = this.typePrefixes.get(typeof(val));
    if (prefix == null) { // Matches undefined due to ==
      throw new Error(`Unsupported type ${typeof(val)}`);
    }

    return prefix + this.encrypt(val.toString(), password);
  }

  public decryptTyped(typedTransitMsg: string, password: string): string | number | boolean {
    if (typedTransitMsg == null) {
      return typedTransitMsg;
    }

    const [ typePrefix, transitMsg ] = typedTransitMsg.split(this.typeSeperator);
    const type = [...this.typePrefixes.entries()].find(([key, val]) => val === typePrefix)?.[0];

    if (type == null) {
      throw new Error('No properly formated typed transit message');
    }

    const valStr = this.decrypt(transitMsg, password);

    if (type === 'number') {
      return +valStr;
    } else if (type === 'boolean') {
      return valStr === 'true';
    }

    return valStr;
  }

  private deriveKeyFromPassword(password: string, salt: string): string {
    const md = forge.md.sha256.create();
    return forge.pkcs5.pbkdf2(password, salt, 15000, 32, md);
  }

  private getTransitMsgStr(salt: string, iv: string, encrypted: string): string {
    return forge.util.encode64(salt + iv + encrypted);
  }

  private parseTransitMsg(transitMsg: string): TransitMsg {
    const byteStr = forge.util.decode64(transitMsg);
    const salt = byteStr.slice(0, 16);
    const iv = byteStr.slice(16, 32);
    const encrypted = byteStr.slice(32);

    return { salt, iv, encrypted };
  }

  public encryptObj<T>(obj: T, password: string, properties: (keyof T)[]): T {
    const entries: [keyof T, string][] = (Object.entries(obj) as [keyof T, any])
      .map(([ key, val ]) => {
        const newVal = properties.includes(key)
          ? this.encryptTyped(val, password)
          : val;

        return [ key, newVal ];
      });

    return Object.fromEntries(entries) as unknown as T;
  }

  public decryptObj<T>(obj: T, password: string, properties: (keyof T)[]): T {
    const entries: [keyof T, string][] = (Object.entries(obj) as [keyof T, any])
      .map(([ key, val ]) => {
        const newVal = properties.includes(key)
          ? this.decryptTyped(val, password)
          : val;

        return [ key, newVal ];
      });

    return Object.fromEntries(entries) as unknown as T;
  }

}
