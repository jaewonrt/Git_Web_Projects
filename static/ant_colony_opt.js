//create a canvas
var ant_canvas = document.getElementById("ant");
var ant_context = ant_canvas.getContext("2d");


var ant_canvas_width= ant_context.canvas.clientWidth;
var ant_canvas_height= ant_context.canvas.clientHeight;
var crawler_moves =[];
var json_crawl = '';
var each_crawler_moves = [];
var crawler_num = 0;
var trail = [];
var displayed_crawer_num = 5

//create the map- thie map will consist of lines and points
sample_map(1);
send_map(everyline, crawler_success, callback_donejax);


function mark_canvas(){
  crawler_moves.forEach(function(crawler_move){
    ant_context.fillRect(crawler_move[0],crawler_move[1],2,2);
  });
};

//point objects
function point(x,y,identity=null){
  this.x = x;
  this.y = y;
  this.identity = identity;
};

//line objects
function line(start_point, end_point){
  this.min_x = Math.min(start_point.x,end_point.x);
  this.max_x = Math.max(start_point.x, end_point.x);
  this.min_y = Math.min(start_point.y, end_point.y);
  this.max_y = Math.max(start_point.y, end_point.y);
  this.length = ((this.max_x - this.min_x)**2 + (this.max_y - this.min_y)**2)**(.5);
  this.start_point = start_point;
  this.end_point = end_point;
  this.allcoordinates
  this.strokeit = function(){
    ant_context.beginPath();
    ant_context.moveTo(start_point.x, start_point.y);
    ant_context.lineTo(end_point.x,end_point.y);
    ant_context.stroke();
  this.line_coordinates = function(){
    var line_coordinates = [[start_point.x, start_point.y], [end_point.x, end_point.y]];
    return line_coordinates;
  };
  };
};

function create_line_counterpart(line_obj,gap){

  var counter_start_point= new point(line_obj.start_point.x + gap,line_obj.start_point.y);
  var counter_end_point = new point(line_obj.end_point.x + gap, line_obj.end_point.y);
  var counter_line = new line(counter_start_point,counter_end_point);
  return counter_line;

};


function sample_map(version){
  //start and end points
  if (version== 1){
    starting_spot= new point(ant_canvas_width/2,0,"start");
    ending_spot = new point(ant_canvas_width/2,ant_canvas_height,"end");
    //create starting and ending paths
    startpath_line1_pt1 = new point(starting_spot.x - 20, starting_spot.y);
    startpath_line1_pt2 = new point(starting_spot.x - 20, starting_spot.y + ant_canvas_height/10);
    startpath_line1 = new line(startpath_line1_pt1, startpath_line1_pt2);
    startpath_line2 = create_line_counterpart(startpath_line1,40);
    endpath_line1_pt1 = new point(ending_spot.x - 20, ending_spot.y);
    endpath_line1_pt2 = new point(ending_spot.x - 20, ending_spot.y - (ant_canvas_height/10));
    endpath_line1 = new line(endpath_line1_pt1, endpath_line1_pt2);
    endpath_line2 = create_line_counterpart(endpath_line1, 40);
    startpath_line1.strokeit();
    startpath_line2.strokeit();
    endpath_line1.strokeit();
    endpath_line2.strokeit();

    //create two path options- route1 is shorter than route2
    midpoint_x= ant_canvas_width/2;
    midpoint_y= ant_canvas_height/2;
    route1_mid1 =  new point(midpoint_x - ant_canvas_width/3, midpoint_y);
    route1_midline1= new line(startpath_line1_pt2,route1_mid1);
    route1_midline2 = create_line_counterpart(route1_midline1, 20);
    route1_endline1 = new line(route1_mid1, endpath_line1_pt2);
    route1_endline2 = create_line_counterpart(route1_endline1, 20);
    route1_midline1.strokeit();
    route1_midline2.strokeit();
    route1_endline1.strokeit();
    route1_endline2.strokeit();

    //here is the longer route2
    route2_mid = new point(midpoint_x + (ant_canvas_width/6), midpoint_y);
    route2_midline1 = new line(startpath_line2.end_point, route2_mid);
    route2_midline2 = create_line_counterpart(route2_midline1, -20);
    route2_endline1 = new line(route2_mid,endpath_line2.end_point);
    route2_endline2 = create_line_counterpart(route2_endline1, -20);
    route2_midline1.strokeit();
    route2_midline2.strokeit();
    route2_endline1.strokeit();
    route2_endline2.strokeit();

    everyline={
      "startpath_line1": startpath_line1.line_coordinates(),
      "startpath_line2": startpath_line2.line_coordinates(),
      "endpath_line1": endpath_line1.line_coordinates(),
      "endpath_line2": endpath_line2.line_coordinates(),
      "route1_midline1": route1_midline1.line_coordinates(),
      "route1_midline2": route1_midline2.line_coordinates(),
      "route1_endline1": route1_endline1.line_coordinates(),
      "route1_endline2": route1_endline2.line_coordinates(),
      "route2_midline1": route2_midline1.line_coordinates(),
      "route2_midline2": route2_midline2.line_coordinates(),
      "route2_endline1": route2_endline1.line_coordinates(),
      "route2_endline2": route2_endline2.line_coordinates()
    };



  };
};



function send_map(map_data, callback, callback_donejax) {
  //this is for passing board info to python

  trail_filler= {"trail": []};
  start_json = [];
  start_json.push(trail_filler);
  start_json.push(map_data);

  $.ajax({
    url : "/test3",
    data: JSON.stringify(start_json),
    type : 'POST',
    dataType: 'json',
    success: callback
  })
  //2nd set of crawlers
  .done(function(json_crawl){
    //extract map from response data
    trail = json_crawl[0]["trail"];
    trail_json = {"trail": trail};
    final_json = [];
    final_json.push(trail_json);
    final_json.push(map_data);

    $.ajax({
      url : "/test3",
      data: JSON.stringify(final_json),
      type: "POST",
      dataType: 'json',
      success: callback_donejax
    })
  //3rd set of crawlers
  .done(function(json_crawl){
    //extract map from response data
    trail = json_crawl[0]["trail"];
    trail_json = {"trail": trail};
    final_json = [];
    final_json.push(trail_json);
    final_json.push(map_data);

    $.ajax({
      url : "/test3",
      data: JSON.stringify(final_json),
      type: "POST",
      dataType: 'json',
      success: callback_donejax
    })
    //4th set of crawlers
    .done(function(json_crawl){
      //extract map from response data
      trail = json_crawl[0]["trail"];
      trail_json = {"trail": trail};
      final_json = [];
      final_json.push(trail_json);
      final_json.push(map_data);

      $.ajax({
        url : "/test3",
        data: JSON.stringify(final_json),
        type: "POST",
        dataType: 'json',
        success: callback_donejax
      })
      //5th set of crawlers
      .done(function(json_crawl){
        //extract map from response data
        trail = json_crawl[0]["trail"];
        trail_json = {"trail": trail};
        final_json = [];
        final_json.push(trail_json);
        final_json.push(map_data);

        $.ajax({
          url : "/test3",
          data: JSON.stringify(final_json),
          type: "POST",
          dataType: 'json',
          success: callback_donejax
        })
        //6th set of crawlers
        .done(function(json_crawl){
          //extract map from response data
          trail = json_crawl[0]["trail"];
          trail_json = {"trail": trail};
          final_json = [];
          final_json.push(trail_json);
          final_json.push(map_data);

          $.ajax({
            url : "/test3",
            data: JSON.stringify(final_json),
            type: "POST",
            dataType: 'json',
            success: callback_donejax
          })
          //7th set of crawlers
          .done(function(json_crawl){
            //extract map from response data
            trail = json_crawl[0]["trail"];
            trail_json = {"trail": trail};
            final_json = [];
            final_json.push(trail_json);
            final_json.push(map_data);

            $.ajax({
              url : "/test3",
              data: JSON.stringify(final_json),
              type: "POST",
              dataType: 'json',
              success: callback_donejax
            })
            //8th set of crawlers
            .done(function(json_crawl){
              //extract map from response data
              trail = json_crawl[0]["trail"];
              trail_json = {"trail": trail};
              final_json = [];
              final_json.push(trail_json);
              final_json.push(map_data);

              $.ajax({
                url : "/test3",
                data: JSON.stringify(final_json),
                type: "POST",
                dataType: 'json',
                success: callback_donejax
              })
              //9th set of crawlers
              .done(function(json_crawl){
                //extract map from response data
                trail = json_crawl[0]["trail"];
                trail_json = {"trail": trail};
                final_json = [];
                final_json.push(trail_json);
                final_json.push(map_data);

                $.ajax({
                  url : "/test3",
                  data: JSON.stringify(final_json),
                  type: "POST",
                  dataType: 'json',
                  success: callback_donejax
                });
              });
            });
          });
  });
  });
});
});
});
};

function crawler_success(response){
  //crawler_moves = response;
  //json_crawl = JSON.parse(response);
  json_crawl = response;
  crawler_num = 0
  ant_context.font = "10px Verdana"
  ant_context.fillText(displayed_crawer_num + " crawlers displayed", 10, 20)
  ant_context.fillText("black: 1st crawler", 10, 40)
  ant_context.fillText("teal: 2nd crawler", 10, 50)
  ant_context.fillText("silver: all the rest", 10, 60)
  json_crawl.forEach(function(each_crawler){
    if (crawler_num == 2){
      ant_context.fillStyle = "#008080"
    };
    if (crawler_num == 3){
      ant_context.fillStyle = "#C0C0C0"
    };
    crawler_num++
    each_crawler_moves = each_crawler["moves"];
    if (each_crawler_moves != undefined){
      each_crawler_moves.forEach(function(crawler_move){
        ant_context.fillRect(crawler_move[0],crawler_move[1],1,1);
      });
    };
  });
};


function parsing_crawlers(json_crawl){
  json_crawl.forEach(function(each_crawler){
    each_crawler_moves = each_crawler["moves"];
    each_crawler_moves.forEach(function(crawler_move){
      ant_context.fillRect(crawler_move[0],crawler_move[1],1,1);
  });
});
};

function callback_donejax(response){
  //crawler_moves = response;
  //json_crawl = JSON.parse(response);
  json_crawl = response;
  ant_context.clearRect(0,0,130,80);
  displayed_crawer_num += 2;
  ant_context.fillStyle = "#000000";
  ant_context.fillText(displayed_crawer_num + " crawlers displayed", 10, 20);
  ant_context.fillText("black: 1st crawler", 10, 40);
  ant_context.fillText("teal: 2nd crawler", 10, 50);
  ant_context.fillText("silver: all the rest", 10, 60);
  json_crawl.forEach(function(each_crawler){
    ant_context.fillStyle = "#C0C0C0";
    each_crawler_moves = each_crawler["moves"];
    if (each_crawler_moves != undefined){
      each_crawler_moves.forEach(function(crawler_move){
      ant_context.fillRect(crawler_move[0],crawler_move[1],1,1);
      });
    };
  });
};
