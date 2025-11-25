-- 모든 호스트에서 연결 허용
CREATE USER IF NOT EXISTS 'fos_user'@'%' IDENTIFIED BY 'fos_password';
GRANT ALL PRIVILEGES ON fos_nestjs.* TO 'fos_user'@'%';
FLUSH PRIVILEGES;

