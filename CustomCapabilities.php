<?php

namespace jamesc\plugins\postsProcessor;

class CustomCapabilities {
    // determines whether or not the user can republish posts
    const PROCESS_POSTS = 'jamesc_process_posts';
    
    static public function createCustomCapabilities(){
        $adminRole = get_role('administrator');
        
        if (!$adminRole->has_cap(self::PROCESS_POSTS)){
            $adminRole->add_cap(self::PROCESS_POSTS, true);
        }
    }
}
