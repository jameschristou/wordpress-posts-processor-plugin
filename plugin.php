<?php

/*
 Plugin Name: Posts Processor
 Description: Processors posts from a list in a database table
 Version: 0.2.0
 */

namespace jamesc\plugins\postsProcessor;

require_once 'CustomCapabilities.php';
require_once 'ManagementPage.php';
require_once 'PostsToProcessRepository.php';
require_once 'RestEndpoints.php';

if (!defined('POSTS_PROCESSOR_PLUGIN_PATH')){
    define('POSTS_PROCESSOR_PLUGIN_PATH', plugin_dir_path(__FILE__));
}

class EntryPoint{
    static public function register(){
        new RestEndpoints();

        if (!is_admin()) {
            // only load this stuff if the user is on the admin pages
            return;
        }
        
        new ManagementPage();
    }
    
    static public function activate(){
        CustomCapabilities::createCustomCapabilities();
        PostsToProcessRepository::createTable();
    }
}

add_action('init', array('\jamesc\plugins\postsProcessor\EntryPoint', 'register'), 99);

register_activation_hook(__FILE__, array( '\jamesc\plugins\postsProcessor\EntryPoint', 'activate'));