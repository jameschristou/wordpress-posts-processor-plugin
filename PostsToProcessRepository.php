<?php

namespace jamesc\plugins\postsProcessor;

class PostsToProcessRepository{
    // gets the multisite safe name of the table. Note there is only one instance of this table
    // per wordpress network. This ensures that the 
    private static function getTablename() {
        return "wp_posts_to_process";
    }
    
    public static function setPostAsProcessed($postId) {
        global $wpdb;
        
        $data = array(
            'processed' => 1,
            'update_date_utc' => gmdate("Y-m-d\TH:i:s\Z"));

        // we assume that the record exists and we just update it
        $where = array('post_id' => $postId);

        $wpdb->update(self::getTablename(), $data, $where);
    }

    public static function setPostsAsProcessed($postIds) {
        global $wpdb;
        
        $sql = "UPDATE " . self::getTablename() . "
                SET processed = 1,
                    update_date_utc = '" . gmdate("Y-m-d\TH:i:s\Z") . "'
                WHERE post_id IN ('" . implode("','", $postIds) . "')";

        $wpdb->query($sql);
    }
    
    public static function getPosts($maxPosts = 10) {
        global $wpdb;
        
        $sql = "
            SELECT *
            FROM " . self::getTablename() . "
            WHERE processed = 0
            ORDER BY post_id ASC
            LIMIT $maxPosts";
        
        return $wpdb->get_results($sql, ARRAY_A);
    }
    
    public static function getTotalPostsToProcess(){
        global $wpdb;
        
        $sql = "
            SELECT COUNT(*) AS Total
            FROM " . self::getTablename() . "
            WHERE processed = 0";
        
        $result = $wpdb->get_results($sql, ARRAY_A);

        return $result[0]["Total"];
    }

    public static function createTable(){
        global $wpdb;

        // need to check whether the table exists first using a query and then run separate command for creating the table
        $sql = "
            SELECT * 
            FROM information_schema.tables
            WHERE table_schema = '" . $wpdb->dbname . "' 
                AND table_name = '" . self::getTablename() . "'
            LIMIT 1;";
        
        $result = $wpdb->get_results($sql, ARRAY_A);

        if(count($result) > 0) return;
        
        $sql = "
            CREATE TABLE `" . self::getTablename() . "` (
                `id` bigint(20) NOT NULL AUTO_INCREMENT,
                `post_id` bigint(20) NOT NULL,
                `processed` tinyint(4) NOT NULL,
                `update_date_utc` datetime NOT NULL,
            
                PRIMARY KEY (`id`),
                KEY `post_id` (`post_id`),
                KEY `ix_processed` (`processed`, `post_id`)
            );";

        $wpdb->query($sql);
    }
}


/**

Use this query to insert the list of currently published posts
 
insert into wp_posts_to_process
(post_id, processed, update_date_utc)
SELECT id, 0, '2019-04-22'
FROM `wp_posts` p
WHERE post_type = 'post' AND (post_status = 'publish' OR post_status = 'private')
 */