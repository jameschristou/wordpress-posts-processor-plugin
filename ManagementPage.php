<?php

namespace jamesc\plugins\postsProcessor;

require_once 'CustomCapabilities.php';
require_once 'AjaxEndpoints.php';
require_once 'PostsToProcessRepository.php';

class ManagementPage
{
    private $pageName = "posts-processor";
    
    public function __construct()
    {
        if(!current_user_can(\jamesc\plugins\postsProcessor\CustomCapabilities::PROCESS_POSTS)){
            return;
        }
        
        add_action('admin_menu', array($this, 'initMenu'));
        add_action('admin_init', array($this, 'initAjax'));
    }

    public function initMenu(){
        add_menu_page( 'Posts Processor', 'Posts Processor', \jamesc\plugins\postsProcessor\CustomCapabilities::PROCESS_POSTS, $this->pageName, array($this, 'ManagementPageHtml'), 'dashicons-screenoptions', 26 );
        
        add_action('current_screen', array($this, 'enqueueJs'));
    }

    public function initAjax(){
        new AjaxEndpoints();
    }
    
    public function enqueueJs($currentScreen){
        // ensure the script is only loaded on the required page
        if($currentScreen->id != "toplevel_page_" . $this->pageName){
            return;
        }
        
        wp_enqueue_script('jamescPostsProcessor', plugins_url('dist/bundle.js', __FILE__), array(), true);
        wp_enqueue_style('jamescPostsProcessor', plugins_url('dist/style.css',  __FILE__), array());
    }
    
    public function ManagementPageHtml()
    {
        global $wpdb;
        
        $total = PostsToProcessRepository::getTotalPostsToProcess();

    ?>
    <div class="wrap nosubsub posts-processor stopped">
        <h2>Posts Processor</h2>
    <?php
        $this->RenderProcessingHtml($total);
    ?>
    </div>
    <?php
    }
    
    private function RenderProcessingHtml($total){
        ?>
        <div id="posts-processor-container"></div>
        <!-- <div class="panel">
            <input id="start-process" class="button button-primary" type="submit" name="start-process" value="Start" />
            <input id="stop-process" class="button button-primary disabled" type="submit" name="stop-process" value="Stop" />
        </div>
        <div class="panel">
            <span>Remaining: </span><span class="total-remaining"><?php echo($total['Total']) ?></span><span>/<?php echo($total['Total']) ?></span>
        </div>
        <div class="progress">
            <span class="status"></span><span class="spinner"><img src='images/spinner.gif' /></span>
        </div>
        <div class="processed-posts">
            <table>
                <thead>
                    <tr>
                        <th class="num"></th>
                        <th class="post-id">PostId</th>
                        <th class="network-id">NetworkId</th>
                        <th class="time-processed">Time Processed</th>
                     </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div> -->
        <?php
    }
}