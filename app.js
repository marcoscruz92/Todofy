$( document ).ready(function() {

  /*Menu-toggle*/
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
  });

  /*Scroll Spy*/
  $('body').scrollspy({ target: '#spy', offset:80});

  /*Smooth link animation*/
  $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top
              }, 1000);
              return false;
          }
      }
  });

  // Bootstrap modal settings
  $('#nameModal').modal({
    backdrop: 'static',
    keyboard: false
  });
  // Display modal to enter name when page loads
  $("#nameModal").modal('show');

  // Add name to the app via submit button
  $("#addName").on("click", function(e){
     e.preventDefault();
      var name = $("#name").val();
      if(name !== ""){
        $("#user").text(name);
        $("#nameModal").modal('hide');
      } else {
        $("#user").text("anonymous");
        $("#nameModal").modal('hide');
      }

  });
  // Add name to the app via enter
  $("#nameForm").submit(function(e){
    e.preventDefault();
     var name = $("#name").val();
     if(name !== ""){
       $("#user").text(name);
     } else {
       $("#user").text("anonymous");
       $("#nameModal").modal('hide');
     }
  });

    // Add task to the app via submit button
    $(document).on("click","#addTask" , function(e){
       e.preventDefault();
        var task = $("#newTask").val();
        if(task !== ""){
          $(".tasks-pending .list-group").append("<li class='list-group-item task'>" + task + "<button type='button' class='btn btn-default pull-right' name='button'>"
           + "<span class='glyphicon glyphicon-arrow-right move-inprogress' aria-hidden='true'></span>" + "</button>" + "<button type='button' class='btn btn-danger pull-right' name='button'>"
           + "<span class='glyphicon glyphicon-remove delete' aria-hidden='true'></span>" + "</button></li>");
           $(".task").addClass("animated flipInX");
           $("#newTask").val('');
           $("#errorMessage").addClass("hidden");
           $("#myModal").modal('hide');
        } else {
          $("#errorMessage").removeClass("hidden");
        }
    });
    // Add task to the app via enter
    $(document).on("submit", "#taskForm", function(e){
      e.preventDefault();
      var task = $("#newTask").val();
      if(task != ""){
        $(".tasks-pending .list-group").append("<li class='list-group-item task'>" + task + "<button type='button' class='btn btn-info pull-right' name='button'>"
         + "<span class='glyphicon glyphicon-arrow-right move-inprogress' aria-hidden='true'></span>" + "</button>" + "<button type='button' class='btn btn-danger pull-right' name='button'>"
         + "<span class='glyphicon glyphicon-remove delete' aria-hidden='true'></span>" + "</button></li>");
         $("#newTask").val('');
         $("#errorMessage").addClass("hidden");
         $("#myModal").modal('hide');
         $(".task").addClass("animated flipInX");
      } else {
        $("#errorMessage").removeClass("hidden");
      }
    });


   // Remove current task from app
   $(document).on("click",".delete", function(){
     var e = $(this).closest("li");
     e.removeClass("animated flipInX");
     e.addClass("animated fadeOutUp");
     setTimeout(function(){
       $(e).remove();
     }, 2000);
   });

  //  Removes pending element and move it to in progress
   $(document).on("click", ".move-inprogress", function(){
     var task = $(this).closest("li").text();
     $(this).closest("li").remove();
     $(".tasks-inprogress .list-group").append("<li class='list-group-item task'>" + task + "<button type='button' class='btn btn-info pull-right move-completed' name='button'>"
      + "<span class='glyphicon glyphicon-arrow-right ' aria-hidden='true'></span>" + "</button>" + "<button type='button' class='btn btn-info pull-right move-pending' name='button'>"
      + "<span class='glyphicon glyphicon-arrow-left' aria-hidden='true'></span>" + "</button></li>").fadeIn();

   });

  //  Moves in progress back to pending task
   $(document).on("click", ".move-pending", function(){
     var task = $(this).closest("li").text();
     $(this).closest("li").remove();
     $(".tasks-pending .list-group").append("<li class='list-group-item task'>" + task + "<button type='button' class='btn btn-info pull-right move-inprogress' name='button'>"
      + "<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + "</button>" + "<button type='button' class='btn btn-danger pull-right delete' name='button'>"
      + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" + "</button></li>").fadeIn();

   });

  // Moves in progress to completed task section
   $(document).on("click", ".move-completed", function(){
     var task = $(this).closest("li").text();
     $(this).closest("li").remove();
     $(".tasks-completed .list-group").append("<li class='list-group-item task'>" + task + "<button type='button' class='btn btn-danger pull-right delete' name='button'>"
      + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" + "</button>" + "<button type='button' class='btn btn-info pull-right move-inprogress' name='button'>"
      + "<span class='glyphicon glyphicon-arrow-left' aria-hidden='true'></span>" + "</button></li>");

   });

});
