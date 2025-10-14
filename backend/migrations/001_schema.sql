-- Essential tables (users, companies minimal) and core tables used by the app.
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password TEXT,
  role VARCHAR(50),
  must_change_password BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  cnpj VARCHAR(20),
  created_by INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS frete_cotacoes (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE,
  company_id INT,
  orcamento_id INT,
  pdv_id INT,
  origem_cep VARCHAR(20),
  destino_cep VARCHAR(20),
  distancia_km NUMERIC(10,2),
  peso_total NUMERIC(12,2),
  cubagem_total NUMERIC(12,2),
  valor_total NUMERIC(15,2),
  status VARCHAR(50) DEFAULT 'Em Cotação',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS manifestos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE,
  company_id INT,
  cotacao_frete_id INT,
  pdv_id INT,
  motorista_id INT,
  transportadora_id INT,
  isca_id INT,
  origem_cep VARCHAR(20),
  destino_cep VARCHAR(20),
  distancia_km NUMERIC(10,2),
  peso_total NUMERIC(12,2),
  cubagem_total NUMERIC(12,2),
  valor_estimado NUMERIC(15,2),
  valor_final NUMERIC(15,2),
  valor_cte NUMERIC(15,2),
  forma_pagamento VARCHAR(20),
  pagamento_adiantamento NUMERIC(15,2),
  pagamento_saldo NUMERIC(15,2),
  data_inicio DATE,
  data_previsao_chegada DATE,
  status VARCHAR(50) DEFAULT 'Pendente de Início',
  localizacao_atual TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS iscas_carga (
  id SERIAL PRIMARY KEY,
  company_id INT,
  codigo VARCHAR(50) UNIQUE,
  site_monitoramento TEXT,
  status VARCHAR(20) DEFAULT 'Disponível',
  rota_atual VARCHAR(100),
  ultima_atualizacao TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pagamentos (
  id SERIAL PRIMARY KEY,
  company_id INT,
  referencia_tipo VARCHAR(50),
  referencia_id INT,
  tipo_pagamento VARCHAR(50),
  metodo VARCHAR(50),
  conta_bancaria_id INT,
  titular_recebeu VARCHAR(255),
  banco_recebeu VARCHAR(100),
  data_pagamento TIMESTAMP,
  valor NUMERIC(15,2),
  tx_id VARCHAR(200),
  observacao TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contas_bancarias (
  id SERIAL PRIMARY KEY,
  company_id INT,
  titular VARCHAR(255),
  banco VARCHAR(100),
  agencia VARCHAR(50),
  conta VARCHAR(50),
  tipo_conta VARCHAR(50),
  pix_chave VARCHAR(255),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
