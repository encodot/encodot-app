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
    const randomString = (length: number, from: number, count: number): string => Array.from(
      { length }, () => String.fromCharCode(from + Math.floor(Math.random() * count))
    ).join('');

    const str = '😈😋😇😈😓𝌃𝌍𝌒𝌆𝌉'; // randomUnicodeString(500);
    const password = 'test'; // randomUnicodeString(500);
    const cipher = service.encrypt(str, password);
    const decrypted = service.decrypt(cipher, password);

    expect(decrypted).toBe(str);
  });

});
