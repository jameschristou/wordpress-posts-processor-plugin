<?php

namespace jamesc\plugins\postsProcessor\processors;

require_once 'ProcessorBase.php';

class ProcessPost extends ProcessorBase
{
    public function process()
    {
        // do whatever you like with the post such as updating the post name
        //wp_update_post(array("ID" => $this->post->ID, "post_name" => $this->post->post_name . "-12345"));
        
        return array("postId" => $this->post->ID,
                    "processed" => date("Y-M-d H:i:s"));
    }
}