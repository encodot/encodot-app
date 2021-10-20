import { AesService } from './aes.service';
import { TestBed } from '@angular/core/testing';
import { Base64Module } from '@shared/base64';

describe('AesService', () => {

  let service: AesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Base64Module ],
      providers: [ AesService ]
    });

    service = TestBed.inject(AesService);
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  test('string should be the same after it was encrypted and then decrypted', () => {
    const str = 'Test';
    const password = 'area51';
    const cipher = service.encrypt(str, password);
    const decrypted = service.decrypt(cipher, password);

    expect(decrypted).toBe(str);
  });

  test('utf-8 special characters should be handled correctly', () => {
    const str = '😈😋😇😈😓𝌃𝌍𝌒𝌆𝌉[]{}^^°°<>!"§$%&/()=?`´*+~#’µ·….,–|@€';
    const password = '[]{}^^°°<>!"§$%&/()=?`´*+~#’µ·….,–|@€';
    const cipher = service.encrypt(str, password);
    const decrypted = service.decrypt(cipher, password);

    expect(decrypted).toBe(str);
  });

  test('object should be the same after it was encrypted and then decrypted', () => {
    const obj1 = {
      t0: '😈😋😇😈😓𝌃𝌍𝌒𝌆𝌉',
      t1: Number.MIN_SAFE_INTEGER,
      t2: true,
      t3: false,
      t4: null,
      t5: undefined,
      dontEncrypt: 'Tests are marvelous'
    };

    const password = '[]{}^^°°<>!"§$%&/()=?`´*+~#’µ·….,–|@€';
    const cipherObj = service.encryptObj(obj1, password, [ 't0', 't1', 't2', 't3', 't4', 't5' ]);
    const obj2 = service.decryptObj(cipherObj, password, [ 't0', 't1', 't2', 't3', 't4', 't5' ]);

    expect(obj2).toMatchObject(obj1);
  });

  test('cipher should be URL safe', () => {
    const str = 'Test';
    const password = 'area51';
    const cipher = service.encrypt(str, password);

    expect(cipher).toMatch(/^([a-zA-Z0-9\.\_\-\~])*$/);
  });

  test('decrypt should throw error on invalid password', () => {
    const t = (): void => {
      const cipher = service.encrypt('Will I ever be decrypted successfully?', 'entropy-is-key');
      service.decrypt(cipher, 'I forgot, hope I will remember');
    };

    expect(t).toThrowError('Decryption failed');
  });

});
