<?php

namespace jamesc\plugins\postsProcessor\processors;

abstract class BatchProcessorBase
{
    abstract public function processPosts($posts);
}