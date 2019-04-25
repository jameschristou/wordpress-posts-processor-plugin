<?php

namespace jamesc\plugins\postsProcessor;

require_once 'PostsToProcessRepository.php';

class RestEndpoints
{
    public function __construct() {
        add_action('rest_api_init', array($this, 'registerRoutes'));
    }

    public function registerRoutes(){
        $namespace = 'posts-processor/v1';

        register_rest_route( $namespace, '/processors', array(
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'getProcessors' )
                ),
            ) );

        register_rest_route( $namespace, '/processors', array(
            array(
                'methods'             => 'POST',
                'callback'            => array( $this, 'processPosts' )
                ),
            ) );
    }

    public function getProcessors(){
        $processors = array("processors" => array("BatchPostProcessor", "ProcessPost"));

        return $processors;
    }

    public function processPosts()
    {
        // make sure debug is not output in the response
        if(ob_get_length()){
            ob_clean();
        }
        
        // the class name of the processor and the filename that it lives in need to be the same
        $processorClassName = $_REQUEST["processorClassName"];
        
        // try loading the file. Its in the processors folder below the current folder
        require_once plugin_dir_path(__FILE__) . "processors/" . $processorClassName . ".php";

        // determine which base class the processor implements
        $processorClassFullName = "jamesc\\plugins\\postsProcessor\\processors\\" . $processorClassName;

        // get the next item to process
        $postsToProcess = PostsToProcessRepository::getPosts(10);
        
        if(empty($postsToProcess)){
            wp_send_json(array(
                "processedPosts" => array(),
                "numProcessedPosts" => 0
            ));
        }

        if(is_subclass_of($processorClassFullName, "jamesc\\plugins\\postsProcessor\\processors\\BatchProcessorBase")){
            $processedPosts = $this->processPostsBulk($postsToProcess, $processorClassFullName);
        }
        else{
            $processedPosts = $this->processPostsIndividually($postsToProcess, $processorClassFullName);
        }
        
        $response = array(
            "processedPosts" => $processedPosts,
            "numProcessedPosts" => count($processedPosts)
        );

        wp_send_json($response);
    }

    private function processPostsBulk($postsToProcess, $processorClassFullName){
        // instantiate the class which will be used to process the post. This class must have a constructor which
        // accepts a post object and must have a public function called process() which will perform the processing
        // and return the processing result. The returned 
        $processorClass = new $processorClassFullName($post);
        $result = $processorClass->processPosts($postsToProcess);
        
        $postIds = array_column($postsToProcess, 'post_id');

        PostsToProcessRepository::setPostsAsProcessed($postIds);

        return $result;
    }

    private function processPostsIndividually($postsToProcess, $processorClassFullName){
        $processedPosts = array();

        foreach($postsToProcess as $postToProcess){
            $processedPost = $this->processPost($postToProcess["post_id"], $processorClassFullName);
            
            if(!empty($processedPost)){
                array_push($processedPosts, $processedPost);
            }
        }
        
        return $processedPosts;
    }
    
    private function processPost($postId, $processorClassFullName){
        $post = get_post($postId);
        
        if($post->post_type != 'post'){
            return null;
        }
        
        // instantiate the class which will be used to process the post. This class must have a constructor which
        // accepts a post object and must have a public function called process() which will perform the processing
        // and return the processing result. The returned 
        $processorClass = new $processorClassFullName($post);
        $result = $processorClass->process();
        
        PostsToProcessRepository::setPostAsProcessed($postId);
        
        return $result;
    }
}