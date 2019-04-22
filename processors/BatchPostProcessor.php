<?php

namespace jamesc\plugins\postsProcessor\processors;

require_once 'BatchProcessorBase.php';

class BatchPostProcessor extends BatchProcessorBase
{
    public function processPosts($posts)
    {
        $processedPosts = array();

        foreach($posts as $post){
            $processedPosts[] = array(
                "postId" => $post["post_id"],
                "processed" => date("Y-M-d H:i:s"));
        }
        
        return $processedPosts;
    }
}