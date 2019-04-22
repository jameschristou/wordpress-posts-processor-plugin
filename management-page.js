jQuery.noConflict();
jQuery(function($) {
    var csnContinueProcessing = false;
    var csnTotalProcessed = 0;
    
    $("#start-process").click(function() {
        setStatus(true, "Processing");
        
        publishNext();
    });
    
    $("#stop-process").click(function() {
        setStatus(false, "Stopped processing");
        
        publishNext();
    });
    
    function setStatus(publishing, statusText){
        csnContinueProcessing = publishing;
        $(".posts-processor .progress .status").text(statusText);
        
        if(publishing){
            $(".posts-processor").removeClass("stopped");
            $("#start-process").addClass("disabled");
            $("#stop-process").removeClass("disabled");
        }else{
            $(".posts-processor").addClass("stopped");
            $("#start-process").removeClass("disabled");
            $("#stop-process").addClass("disabled");
        }
    }
    
    function publishNext(){
        if(!csnContinueProcessing){
            return;
        }
        
        var requestObject = {};

        requestObject['action'] = "admin_csn_process_posts";
        requestObject['fileToLoad'] = $("#processing-class-filename").val();
        requestObject['processorClassName'] = $("#processing-class-name").val();

        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: requestObject,
            dataType: "json",
            success: function(output) {
                if(!output){
                    setStatus(false, "Failed processing");
                    return;
                }
                
                updateTotalRemaining(output.numProcessedPosts);
                
                if(output.numProcessedPosts > 0){
                    updateList(output.processedPosts);
                    publishNext();
                }
                else if(output.numProcessedPosts === 0){
                    setStatus(false, "Finished processing");
                }
            },
            error: function(e) {
                setStatus(false, "Failed processing");
            }
        });
    }
    
    function updateList(processedPosts){
        for (var i = 0; i < processedPosts.length; i++) {
            csnTotalProcessed++;
            $(".processed-posts tbody").append("<tr><td>" + csnTotalProcessed + "</td><td>" + processedPosts[i].postId + "</td><td>ED-ITM-" + processedPosts[i].networkId + "</td><td>" + processedPosts[i].pushTime + "</td></tr>");
        }
    }
    
    function updateTotalRemaining(numProcessedPosts){
        var total = parseInt($(".posts-processor .total-remaining").text());
        
        total = total - numProcessedPosts;
        
        $(".posts-processor .total-remaining").text(total);
    }
});