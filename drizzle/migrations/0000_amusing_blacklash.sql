CREATE TABLE `store` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`is_open` boolean NOT NULL DEFAULT true,
	CONSTRAINT `store_id` PRIMARY KEY(`id`)
);
