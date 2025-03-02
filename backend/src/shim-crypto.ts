// shim-crypto.ts
import * as nodeCrypto from 'crypto';

// Se TypeORM checa `globalThis.crypto`, vamos forçar a existência dele cedo
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = nodeCrypto;
}
