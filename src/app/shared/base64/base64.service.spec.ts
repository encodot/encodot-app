import { TestBed } from '@angular/core/testing';
import { Base64Service } from './base64.service';
import * as forge from 'node-forge';

describe('Base64Service', () => {

  let service: Base64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Base64Service ]
    });

    service = TestBed.inject(Base64Service);
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  test('string should be the same after it was encoded and then decoded', () => {
    const str = '😈😋😇😈😓𝌃𝌍𝌒𝌆𝌉[]{}^^°°<>!"§$%&/()=?`´*+~#’µ·….,–|@€';
    const enc = service.encode(forge.util.encodeUtf8(str));
    const dec = forge.util.decodeUtf8(service.decode(enc));

    expect(dec).toBe(str);
  });

  test('string should be the same after it was encoded and then decoded (url safe)', () => {
    const str = '😈😋😇😈😓𝌃𝌍𝌒𝌆𝌉[]{}^^°°<>!"§$%&/()=?`´*+~#’µ·….,–|@€';
    const enc = service.encodeUrl(forge.util.encodeUtf8(str));
    const dec = forge.util.decodeUtf8(service.decodeUrl(enc));

    expect(dec).toBe(str);
  });

  test('url safe encoded should be url safe', () => {
    const str = Array.from({ length: 0xff }, (_, i) => String.fromCodePoint(i)).join(''); // Every possible byte.
    const enc = service.encodeUrl(str);

    expect(enc).toMatch(/^([a-zA-Z0-9\.\_\-\~])*$/);
  });

});
