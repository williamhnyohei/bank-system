import { webcrypto } from 'crypto';
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../APPs/app.module';
import { DataSource } from 'typeorm';

async function syncDatabase() {
  try {
    console.log("⏳ Conectando ao banco de dados para sincronizar tabelas...");
    
    // Criando contexto da aplicação NestJS
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    
    await dataSource.synchronize();
    console.log("✅ Tabelas sincronizadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar tabelas:", error);
    process.exit(1);
  }
}

syncDatabase().finally(() => process.exit());