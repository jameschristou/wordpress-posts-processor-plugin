CREATE TABLE `wp_posts_to_process` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `post_id` bigint(20) NOT NULL,
    `processed` tinyint(4) NOT NULL,
    `update_date_utc` datetime NOT NULL,

    PRIMARY KEY (`id`),
    KEY `post_id` (`post_id`),
    KEY `ix_processed` (`processed`, `post_id`)
);