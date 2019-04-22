<?php

namespace jamesc\plugins\postsProcessor\processors;

abstract class ProcessorBase
{
    protected $post;
    
    public function __construct($post)
    {
        $this->post = $post;
    }
    
    abstract public function process();
}