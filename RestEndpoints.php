<?php

namespace jamesc\plugins\postsProcessor;

require_once 'PostsToProcessRepository.php';

class RestEndpoints
{
    private $processors;

    public function __construct() {
        // low priority so that anyone implementing custom processors can register them before
        // filter is run
        add_action('rest_api_init', array($this, 'registerRoutes'), 100);
    }

    private function loadProcessors(){
        $defaultProcessors = array(
            "BatchPostProcessor" => array(
                    "displayName" => "BatchPostProcessor", 
                    "className" => "jamesc\\plugins\\postsProcessor\\processors\\BatchPostProcessor",
                    "classFilePath" => plugin_dir_path(__FILE__) . "processors/BatchPostProcessor.php"
            ),
            "ProcessPost" => array(
                    "displayName" => "ProcessPost",
                    "className" => "jamesc\\plugins\\postsProcessor\\processors\\ProcessPost",
                    "classFilePath" => plugin_dir_path(__FILE__) . "processors/ProcessPost.php"
            )
        );

        $this->processors = apply_filters('posts_processor_custom_processors', $defaultProcessors);
    }

    public function registerRoutes(){
        $this->loadProcessors();

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

        register_rest_route( $namespace, '/posts-to-process', array(
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'getPostsToProcess' )
                ),
            ) );

        register_rest_route( $namespace, '/init-data', array(
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'getInitData' )
                ),
            ) );
    }

    public function getInitData(){
        $processors = $this->getProcessors();
        $totalPosts = PostsToProcessRepository::getTotalPostsToProcess();

        $response = array("processors" => $processors['processors'],
                    "totalPosts" => $totalPosts);

        wp_send_json($response);
    }

    public function getProcessors(){
        $processors = array_values($this->processors);

        return array("processors" => $processors);
    }

    public function getPostsToProcess(){
        $totalPosts = PostsToProcessRepository::getTotalPostsToProcess();

        $response = array(
            "totalPosts" => $totalPosts
        );

        wp_send_json($response);
    }

    public function processPosts()
    {
        // make sure debug is not output in the response
        if(ob_get_length()){
            ob_clean();
        }
        
        // the class name of the processor and the filename that it lives in need to be the same
        $processorName = $_REQUEST["processorName"];

        $processorDetails = $this->processors[$processorName];

        $batchSize = empty($_REQUEST["batchSize"]) ? 1 : $_REQUEST["batchSize"];
        
        // try loading the file. Its in the processors folder below the current folder
        // TODO: extend this functionality so that other developers can write their own processors and host them anywhere
        require_once $processorDetails["classFilePath"];

        // determine which base class the processor implements
        $processorClassFullName = $processorDetails["className"];

        // get the next item to process
        $postsToProcess = PostsToProcessRepository::getPosts($batchSize);
        
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
        $processorClass = new $processorClassFullName();
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