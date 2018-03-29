
var map;  // Global variable for map initialization 

$(document).ready(function() {
        
// Retrieve Information about RESEARCH Work

var color =  ['#F4B350','#ACA24C','#3498DB','#6C7A89','#019875','#F2784B','#D64541','#32AC82','#D15A2E','#5AFF7E','#FF9D5E','#D12E98'];    
 
var ico = ['fa fa-gg fa-2x','fa fa-database fa-2x','fa fa-pencil-square-o fa-2x','fa fa-map-marker fa-2x','fa fa-user fa-2x','fa fa-heartbeat fa-2x','fa fa-mobile fa-2x','fa fa-sitemap fa-2x','fa fa-file-o fa-2x','fa fa-server fa-2x','fa fa-university fa-2x','fa fa-object-group fa-2x'];
    
xhr('get',{path:"/research/"}).done(function(rech){
	
    
    $.each(rech.byInterestArea,function(i,item){
       
        
     $('#research').append('<div id="ball'+i+'" class="circle col-md-2" style="background-color:'+color[i]+';cursor:pointer"><h6 style="padding-top:33%;margin-bottom: 0%;font-size:1.2vw;color:white">'+ item.areaName+'</h6><i class="'+ico[i]+'" style="font-size:1.8vw;color:white;margin-top:5px" aria-hidden="true"></i></div>');
  
        // Use of Jquery Rotate Plugin
     
    $("#ball"+i).rotate({ 
   bind: 
     { 
        mouseover : function() { 
            $(this).rotate({animateTo:360})
        },
        mouseout : function() { 
            $(this).rotate({animateTo:0})
        }
     } 
   
});    
        
        // use of jquery-confirm plugin for use of Dialog box on the fly
        $(".circle").eq(i).click(function(){
            var x = '';
            
            $.each(rech.byInterestArea[i].citations,function(j,item1)
                  {
                   
                      x += '<li style="color:black;font-size:12px">'+item1+'</li>';
                  })
            
        
            
             $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Research By Domain Area: '+item.areaName+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<ul>'+x+'</ul>',
                animationBounce: 2.0,
                animationSpeed: 600,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"65%",
                titleClass : "g-text-center--xs"
                     
             }); 
            
        })
        
        
    })
  
    // Data for research by Faculty
   
  var imag = [];  // To store the images for each faculty member who has done research

     $.each(rech.byFaculty,function(m,fact){
        if(m==0){
            
            $('#research2').append('<div style="cursor:pointer" data-uname="'+this.username+'" class ="grow1 view view-first imgsquare"></div>');
        }
         else{
         
         $('#research2').append('<div data-uname="'+this.username+'" class ="grow1 view view-first imgsquare"><div class="mask" style="background:transparent"><h2 style="background:rgb(1, 152, 117);padding: 1em;font-size:10px;margin-top:75%">'+this.facultyName+'</h2></div></div>'); 
         }
         
      if(m>0) {    // Image for faculty with username "dgcics" not available
   
     
     xhr('get',{path:'/people/faculty/username='+this.username}).done(function(json9){
	  
         imag[m] = json9.imagePath;
           $('.imgsquare').eq(m).css(
          {
    'cursor' : 'pointer',
    'background':'url('+imag[m]+') 0% 0% / 100% 100% no-repeat',
    'min-height': '10.5vw',
    'min-width': '10.5vw',
    'position': 'relative',
    'margin': '.51%',
    'z-index': '4',
    'overflow': 'hidden'        
        });
         
      });
     }
         
         
      $(".imgsquare").eq(m).click(function(){
            var x = '';
            
            $.each(rech.byFaculty[m].citations,function(j,item1)
                  {
                   
                      x += '<li style="color:black;font-size:12px">'+item1+'</li>';
                  })
            
        
            
             $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+fact.facultyName+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<ul>'+x+'</ul>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"65%",
                titleClass : "g-text-center--xs"
                     
             }); 
            
        })    
         
    }) 
     
   
})
    

// Retrieve Information for Google Map Api (via Ajax call) and Generate the map       
    
xhr('get',{path:"/location/"}).done(function(json_map){

initMap();  

    
  $.each(json_map,function(i,location){
      var title = location.city+','+location.state;
      
      var loc = location.city+location.state;

            
       var empList = [];
      
      xhr('get',{path:"/employment/"}).done(function(empl){
          
           $.each(empl.coopTable.coopInformation,function(k,coop){
               
               if(loc.toLowerCase()==coop.city.toLowerCase()){
                   
                   empList.push(coop);
               }
                      
           })
          
          $.each(empl.employmentTable.professionalEmploymentInformation,function(f,coop1){
               
               if(loc.toLowerCase()==coop1.city.toLowerCase()){
                   
                   empList.push(coop1);
               }
                      
           })
          
         addMarker(location.latitude,location.longitude,title,empList);
        
      })    
      
  })
    

});
    
// Retrieve Information for News Section from another proxy (http://ist.rit.edu/~istdev/api/news/)
    
news('get',{path:"/news/"}).done(function(News){

    // Collect Info for News
    
$("#new").on('click',function(){
       
   var x = "";
        
         $.each(News.older,function(k,item){
        
        x += '<h6> Published: '+item.date+'</h6><h5> Title: '+item.title+'</h5><h6>'+item.description+'</h6><hr style="height:3px;color:black">';  
           
       })
   

     $.dialog({
                title: '<h4 style="color:#ee6557;margin-top:8px">News</h4>',
                content:'<div>'+x+'</div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"
                     
             }); 

         })    
    
})

})// Document ready

function initMap() {
      
         var StartLocation = {lat: 37.972753, lng: -95.681656};
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: StartLocation,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
          position: StartLocation,
          map: map
        });
      }

var basket = [];
function addMarker(Latitude,Longitude,Title,EmpList){
   
   var info = '<h4>'+Title+'</h4>';

    
    $(EmpList).each(function(u,list)
    {  
        if(list.title==undefined){
        
        info += '<div style="text-align:left"><h4 style="font-size:12px">Employer: '+list.employer+'</h4><h4 style="font-size:12px">Degree: '+list.degree+'</h4><h4 style="font-size:12px;border-bottom:1px solid grey">Date: '+list.term+'</h4></div>';
        }
        else{
            
            info += '<div style="text-align:left"><h4 style="font-size:12px">Employer: '+list.employer+'</h4><h4 style="font-size:12px">Job Title: '+list.title+'</h4><h4 style="font-size:12px">Degree: '+list.degree+'</h4><h4 style="font-size:12px;border-bottom:1px solid grey">Date: '+list.startDate+'</h4></div>'; 
        }
    })
    
     var latLng = new google.maps.LatLng(Latitude,Longitude);
    
      var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: Title
        });
    
    marker.IWContent = ''+info+'';
			marker.infowindow = new google.maps.InfoWindow({});
			google.maps.event.addListener(marker, 'click', function() 
          {
            $(basket).each(function(i, marker){
				marker.infowindow.close();
            });
            marker.infowindow.setContent(marker.IWContent);
            marker.infowindow.open(map,marker);
          });
         basket.push(marker); 
    
}  // Marker end

       