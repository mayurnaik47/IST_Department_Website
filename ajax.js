

// Main function to called after loading  HTML body (Excluding resources like images,audio,video..etc)
$(document).ready(function() {
 
 // Function call to build parallel axis
    
buildParallax('#parallax','chic3.jpg');
    
buildParallax('#parallax2','03.jpg');
    
buildParallax('#parallax3','07.jpg');
    
buildParallax('#parallax4','p2.jpg');
 
$('#parallax2').css({maxHeight:'100%'});  
$('#parallax4').css({maxHeight:'100%'});  
    
$('.boxParent').css({
    
  display: 'flex',
 'flex-wrap': 'wrap',
 'max-width' : '100%',
 'height' : '200%'
})
    
$('.boximg').css({   
  display: 'flex',
 'flex-wrap': 'wrap',
 'max-width' : '100%',
 'height' : '200%'
})  

$('.boximg div').css({   
    'min-height': '10.2vw',
    'min-width': '10.2vw',
    'position': 'relative',
    'margin': '.51%',
    'z-index': '4',
    'overflow': 'hidden'
}) 
    
$('.boxParent div').css({
  'background-color': '#f1f1f1',
  'width': '250px',
   margin: '10px',
    'padding' : '1em',
    'padding-top' : '30px'
})
 
$('.boxParent div.em').css({
  'background-color': '#f1f1f1',
  'width': '350px',
   margin: '20px',
 
    'padding' : '1em',
    'padding-top' : '30px'
})

$('.people').css({
    
    'min-height': '17vh',
    'position': 'relative',
    'transition': 'transform .6s ease',
    'z-index': '4',
    'width': '16vw'
    
})


// Ajax calls

// Retrieve info for "ABOUT" column

xhr('get',{path:"/about/"}).done(function(json){
	
	      $("#about1").append('<h4 class="text-uppercase g-color--primary g-letter-spacing--2 g-margin-b-25--xs">'+json.title+'</h4>');	
          
          $("#about1").append('<h6>'+json.description+'</h6><h6 id = "quote"><i>'+json.quote+'</i></h6><h6 id="author">~'+json.quoteAuthor+'</h6>');	
    
         // use of TypeIT plugin
          $("#quote").typeIt({
               speed: 30,
              strings:json.quote,
              autoStart:false
            
          });
    
         $("#author").css('color','brown').css('font-size','12px').css('padding-left','30%');
    
		});


// Retrieve information regarding Undergrade degree

xhr('get',{path:"/degrees/undergraduate/"}).done(function(json1){
	

    var obj = new Array();   // To store all objects from undergrade data
    

    $.each(json1.undergraduate,function(i,item){
           
        obj[i]=item;
         $(".undergrad").eq(i).append('<h2 style="color:white;margin-bottom:0px">'+obj[i].title+'</h2>').css('cursor','pointer');
    
         $(".undergrad1").eq(i).append('<h5 style="color:#072445;font-weight:bold;margin-top:8px">'+obj[i].title+'</h5>').append('<h6 style="color:white">'+obj[i].description+'</h6>').append('<i class="fa fa-info-circle" style="font-size:30px;color:lightblue;margin-top:5px" aria-hidden="true"></i>').css('cursor','pointer');
        
       
        // use of jquery-confirm plugin for use of Dialog box on the fly
        $(".undergrad1").eq(i).click(function(){
            var x = '';
            
            var icon = ['fa-book','fa-briefcase','fa-bullseye','fa-archive','fa-code'];  //Icons for list items 
            
            var link =  new Array();
            link[0] = 'http://wmc.rit.edu';
            link[1] = 'http://hcc.rit.edu';
            link[2] = 'http://cit.rit.edu';
            
            $.each(json1.undergraduate[i].concentrations,function(j,item1)
                  {
                   
                      x += '<li style="color:black">'+(j+1)+'. '+item1+'</li>';
                  })
            
            
             $.dialog({
                title: '<div style="color:#13b1cd;text-align:center;width:100%;font-size:30px;margin-top:8%">'+obj[i].title+'</div><br><p style="color:black;text-align:center"> CONCENTRATIONS </p><hr style="margin-top:0px;margin-bottom:0px;width:100%">',
                content: '<ul style="list-style: none;color:black">'+x+'</ul><p>To learn more about this degree,visit our website</p><a href ='+link[i]+'>'+link[i]+'</a>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"55%",
                titleClass : "g-text-center--xs"
                     
             }); 
            
            
        })
        
        
    })
  
           
    })
       
   
// Retrieve information regarding Grade degree

xhr('get',{path:"/degrees/graduate/"}).done(function(json1){
	
   
    var obj = new Array();   // To store all objects from undergrade data
    
    var b="";
    var ic = ['fa fa-database','fa fa-group','fa fa-graduation-cap'];
    $.each(json1.graduate,function(i,item){
      
        if(item.degreeName !=="graduate advanced certificates"){
        
        b = ' <div class="view view-sixth col-md-4 col-xs-4 grad1"  style="min-height:37vh;z-index: 1;position: relative;transition: transform .7s ease;)"><i class="'+ic[i]+'" style="font-size:132px;color:#ee6557" aria-hidden="true"></i><h3 style="font-size:2.3vw">'+item.title+'</h3><div class="mask" style="background:rgba(146, 96, 91, 0.93);cursor:pointer"><h2 style="background:#EB4D1C;padding: 1em">'+item.title+'</h2><p style="font-size:14px">'+item.description+'</p></div></div>'
        
        $('#grad5').append(b);
        
        }
        
        if(item.degreeName=="graduate advanced certificates")
            {
                $.each(json1.graduate[i].availableCertificates,function(k,item5){
                   
                   $('.adv').eq(k).append('<h6 style="margin-top:0px;margin-bottom:0px;paddin-bottom:0px">'+item5+'</h6>');
                    
                })
            }
       
        // use of jquery-confirm plugin for use of Dialog box on the fly
        $(".grad1").eq(i).click(function(){
            var x = '';
            
           // var icon = ['fa-book','fa-briefcase','fa-bullseye','fa-archive','fa-code'];  //Icons for list items 
            
            var link =  new Array();
            link[0] = 'http://it.rit.edu';
            link[1] = 'http://hci.rit.edu';
            link[2] = 'http://nsa.rit.edu';
            
            $.each(json1.graduate[i].concentrations,function(j,item1)
                  {
                   
                      x += '<li style="color:black">'+(j+1)+'. '+item1+'</li>';
                  })
            
        
            
             $.dialog({
                title: '<div style="color:#ee6557;text-align:center;width:100%;font-size:30px;margin-top:8%">'+item.title+'</div><br><p style="color:black;text-align:center"> CONCENTRATIONS </p><hr style="margin-top:0px;margin-bottom:0px;width:100%">',
                content: '<ul style="list-style: none;color:black">'+x+'</ul><p>To learn more about this degree,visit our website</p><a style = "color:#ee6557" href ='+link[i]+'>'+link[i]+'</a>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"55%",
                titleClass : "g-text-center--xs"
                     
             }); 
            
        })
        
        
    })
  
      $(".adv").hover(function(){
          $(this).addClass('advc');
          $(this).children().first().css({color:'white'});
          $(this).children().eq(1).css({color:'white'});
    },function(){
        
       $(this).removeClass('advc');
          $(this).children().first().css({color:'#ee6557'});
         $(this).children().eq(1).css({color:'black'});
    }); 
        

           
    })    
    
// Retrieve information regarding UnderGrade Minors

xhr('get',{path:"/minors/"}).done(function(json1){
	  
   
    var obj = new Array();   // To store all objects from undergradeMinors data
    
    var g="";
    var icon1 = ['fa fa-sitemap','fa fa-university','fa fa-street-view','fa fa-server','fa fa-user-secret','fa fa-tablet','fa fa-shield','fa fa-mortar-board']
    
    $.each(json1.UgMinors,function(i,item){
       
        g = '<div data-tilt class = "minorBox js-tilt col-md-3" style="transform-style:preserve-3d;cursor:pointer;z-index: 4;min-height: 240px; background-color: rgb(241, 241, 241);width:250px;margin:10px;padding: 20px 1em 1em"><i class="'+icon1[i]+'" style="font-size:45px;color:#ee6557;transform: translateZ(50px);margin-top:20px" aria-hidden="true"></i></div> '
        
     
        $('#minor5').append(g);
        
        obj[i]=item;

         $(".minorBox").eq(i).append('<p style="color:black;font-size:19px">'+obj[i].title+'</p>');
         
           $(".minorBox").eq(i).hover(function(){
             $(".minorBox").eq(i).append('<i class="fa fa-info ifo" style="font-size:20px;color:#ee6557;position:absolute;bottom:4px;right:8px" aria-hidden="true"></i>');
             
             },function(){  $(".minorBox .ifo").css({'display':'none'})    }); 
        
       // Use of tilt box plugin    
       $('.js-tilt').tilt({
            scale: 1.1
        })
        
        // use of jquery-confirm plugin for use of Dialog box on the fly
        $(".minorBox").eq(i).click(function(){
            var x = '';
            
            var obj1 = new Array();
            
            $.each(json1.UgMinors[i].courses,function(j,item1)
                  {
                   
                       
                    x += '<div class = "one" style = "cursor:pointer" id ="'+item1+'" onclick ="nestedModel(this)"><h5>'+item1+'</h5></div>'; 
                    
                   
                  })
             
            
             $.dialog({
                title: '<h1 style="color:#ee6557;margin-top:8px">Minor: '+obj[i].title+'</h1>',
                content: '<div class="outer"><p>'+obj[i].description+'</p><h3 class="course"> COURSES </h3><div class = "course_name">'+x+'</div><br><em><p style="color:#ee6557;">'+obj[i].note+'</p></em><p style="color:#ee6557;">Click on the courses to view more description</p></div>',
                animationBounce: 1.8,
                animationSpeed: 400,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"
                     
             }); 
            
        })
        
        
    })
  
           
    })    
    

    
 
// Retrieve Information for CoopTable  and other Employment attributes 
    
xhr('get',{path:"/employment/"}).done(function(Co_tabel){

    // Collect Info for Co-op Table
    
$("#emp1").on('click',function(){
       
   var x = "";
        
         $.each(Co_tabel.coopTable.coopInformation,function(k,item){
        
        x += '<tr><td>'+item.degree+'</td><td>'+item.employer+'</td><td>'+item.city+'</td><td>'+item.term+'</td></tr>';  
           
       })
   

     $.dialog({
                title: '<h4 style="color:#ee6557;margin-top:8px">Recent Student Coop Jobs (6/2013-9/2015)</h4>',
                content:'<table class="table table-striped" style="max-width:80%;margin:auto"><thead><tr style="border:1px solid black"><th>Degree</th><th>Employer</th><th>Location</th><th>Term</th></tr></thead><tbody style="font-size:10px">'+x+'</tbody></table>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"
                     
             }); 

         })
    
    $("#emp2").on('click',function(){
    
    var y = "";
     
       
         $.each(Co_tabel.employmentTable.professionalEmploymentInformation,function(k,item){
        
              
        y += '<tr><td>'+item.degree+'</td><td>'+item.employer+'</td><td>'+item.city+'</td><td>'+item.title+'</td><td>'+item.startDate+'</td></tr>';  
           
       })
   

     $.dialog({
                title: '<h4 style="color:#ee6557;margin-top:8px">Graduating Student Employment (12/2010-11/2015)</h4>',
                content:'<table class="table table-striped" style="max-width:80%;margin:auto"><thead><tr style="border:1px solid black"><th>Degree</th><th>Employer</th><th>Location</th><th>Title</th><th>Start Date</th></tr></thead><tbody style="font-size:10px">'+y+'</tbody></table>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"
                     
             }); 

         })
    
    
    $("#emp1,#emp2").hover(function(){
              $(this).css({
          'background-color' : '#ee6557'
           })
     $(this).children().first().css({
                 color : 'white'
        })
        
        $(this).append('<i class="fa fa-info-circle ifo2" style="font-size:20px;color:white;position:absolute;bottom:4px;right:8px" aria-hidden="true"></i>');
        
    },function(){
        
        $(".ifo2").css({display:'none'})
        
        $("#emp2,#emp1").css({
            
        'background-color' : 'white'
            
        })
       $("#emp1").children().first().css({
           
           color: '#ee6557'
       }) 
         $("#emp2").children().first().css({
           
           color: '#ee6557'
       }) 
    }); 
    
    // Collect info for Employment Section.
    
         var col = ['#1A5AF0','#D64541','#1A3912','#013741'];
         
      var pm = '<h2>'+Co_tabel.introduction.title+'</h2><br><h4 style="color:#ee6557">'+Co_tabel.introduction.content[0].title+'</h4><hr style="background: #918E82;width: 150px;height: 1px;border: none;"><p>'+Co_tabel.introduction.content[0].description+'</p><br><div class="row">'
    
     $.each(Co_tabel.degreeStatistics.statistics,function(k,item){
        
        pm += '<div class="col-md-3 col-sm-12 col-xs-12" style="background:'+col[k]+';padding:1em;margin: 1%;width: 22.75%;z-index:4;min-height: 250px;overflow: hidden;color:#1f1f1f"><h1 style="color:aliceblue;font-size: 2.6vw;padding-top: 2%">'+item.value+'</h1><h6 style="color:aliceblue;text-transform: uppercase;font-size: 1.2vw">'+item.description+'</h6></div>' 
           
       })
   
      pm  += '</div><br><p style="color:#ee6557;font-size:1.4rem">'+Co_tabel.introduction.content[1].title+'</p><hr style="background: #918E82;width: 150px;height: 1px;border: none;"><p>'+Co_tabel.introduction.content[1].description+'</p><br><h4 style="color:#ee6557;margin-top:0%">'+Co_tabel.employers.title+'</h4><hr style="background: #918E82;width: 150px;height: 1px;border: none;">'
    
    $.each(Co_tabel.employers.employerNames,function(m,item5){
        
        pm += '<h6 style="display: inline-block;margin: 1%;padding:0;color:#013741;margin-top:0% ">'+item5+'</h6>' 
           
       })
    
    pm = pm + '<br><br><h4 style="color:#ee6557;margin-top:0%">'+Co_tabel.careers.title+'</h4><hr style="background: #918E82;width: 150px;height: 1px;border: none;">'
    
    $.each(Co_tabel.careers.careerNames,function(n,item6){
        
        pm += '<h6 style="display: inline-block;margin: 1%;padding:0;color:#013741;margin-top:0% ">'+item6+'</h6>' 
           
       })
    pm += '<br><p style="font-size:10px">  *Employers/Careers are randomly pulled from our recent graduates</p>'
    
    $('#emp').append(pm);
         
     })
  

// Retrieve Information about People  [Also used to display research work by faculty]
    
xhr('get',{path:"/people/"}).done(function(peo){

    // Faculty is selected initially
    $('#faculty_people').css({
            
            'background-color' : '#1abc9c'
            
        })
    
     $.each(peo.faculty,function(m,fact){
       
    
        $('#people1').append('<div class="people grow col-md-3 col-sm-3 faculty" data-uname="'+fact.username+'" data-type = "faculty" style="border: 2px solid white; cursor: pointer; min-height: 13vh; min-width: 10.2vw; position: relative; margin: 0.51%; z-index: 4; overflow: hidden; transition: transform 0.6s ease; width: 16vw"><h5 style="padding-top:13%;margin-bottom: 0%;font-size:1.5vw;color:whitesmoke">'+fact.name+'</h5><h6 style="color:lightblue;font-size:0.8vw;padding-bottom:2.5%">'+fact.title+'</h6></div>'); 
         
         
         // use of jquery-confirm plugin for use of Dialog box on the fly
        $(".faculty").eq(m).click(function(){
            
            var em = 'envelope';
            var we = 'link';
            var fb = 'facebook-f';
            var tw = 'twitter';
            var ph = 'phone';
            var of = 'marker';
            
           
            if(fact.email=="" || fact.email == null)
                {
                    em = " ";
                    fact.email = "";
                }
            
            if(fact.website=="" || fact.website==null)
                {
                    we = " ";
                    fact.website = "";
                }
            
            if(fact.twitter=="" || fact.twitter==null)
                {
                    tw = " ";
                    fact.twitter = "";
                }
            
            if(fact.facebook==""|| fact.facebook==null)
                {
                    fb = " ";
                    fact.facebook = "";
                }
            
             if(fact.phone==""|| fact.phone==null)
                {
                    ph = " ";
                    fact.phone = "";
                }
            
             if(fact.office==""|| fact.office==null)
                {
                    of = " ";
                    fact.office = "";
                }
            
            
            
             $.dialog({
                title: '<h2 style="color:orangered;margin-top:1.5%;margin-bottom:0%">'+fact.name+', <desc style="font-size:20px;color:grey">'+fact.title+'  '+fact.tagline+'</desc></h2>',
                content: '<div><div class="span9"><hr style="width:100%;"></div><div class="row"><p class="col-md-7 col-sm-7 col-xs-7"><img src="'+fact.imagePath+'" title="'+fact.name+'" style="max-width:45vw;"></p><div class="col-md-5 col-sm-5 col-xs-5" style="margin-top:0px"><p style="margin-bottom:1.7%"><i class="fa fa-map-'+of+'"></i> '+fact.office+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+ph+'"></i> '+fact.phone+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+em+'"></i> '+fact.email+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+we+'"></i> '+fact.website+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+tw+'"></i> '+fact.twitter+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+fb+'"></i> '+fact.facebook+'</p></div></div></div>',
                animationBounce: 2.0,
                animationSpeed: 600,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"                     
             }); 
            
        }) 
          
    }) 
    
    
     $.each(peo.staff,function(k,staff){
       
        $('#people1').append('<div class="people col-md-3 grow col-sm-3 staff" data-uname="'+staff.username+'" data-type = "staff" style="background-color: transparent; color:white; border: 2px solid white; cursor: pointer; min-height: 12vh; min-width: 10.2vw; position: relative; margin: 0.31%; z-index: 4; overflow: hidden; transition: transform 0.6s ease;width: 17vw"><h5 style="padding-top:15%;margin-bottom: 0%;font-size:1.5vw;color:whitesmoke">'+staff.name+' </h5><h6 style="color:lightblue;font-size:0.8vw;padding-bottom:2.5%">'+staff.title+'</h6></div>'); 
        
        $('.staff').eq(k).hover(function(){
           
            $(this).css({
                
                'background-color' : '#16a085'
            })
            
        },function(){
            $(this).css({ 
             'background-color' : 'transparent'
            })
        }) 
         
         
         $(".staff").eq(k).click(function(){ 
         
        // use of jquery-confirm plugin for use of Dialog box on the fly
      
            var em = 'envelope';
            var we = 'link';
            var fb = 'facebook-f';
            var tw = 'twitter';
            var ph = 'phone';
            var of = 'marker';
            
           
            if(staff.email=="" || staff.email == null)
                {
                    em = " ";
                    staff.email = "";
                }
            
            if(staff.website=="" || staff.website==null)
                {
                    we = " ";
                    staff.website = "";
                }
            
            if(staff.twitter=="" || staff.twitter==null)
                {
                    tw = " ";
                    staff.twitter = "";
                }
            
            if(staff.facebook==""|| staff.facebook==null)
                {
                    fb = " ";
                    staff.facebook = "";
                }
            
             if(staff.phone==""|| staff.phone==null)
                {
                    ph = " ";
                    staff.phone = "";
                }
            
             if(staff.office==""|| staff.office==null)
                {
                    of = " ";
                    staff.office = "";
                }
         
               
          $.dialog({
                title: '<h2 style="color:orangered">'+staff.name+', <desc style="font-size:smaller;color:grey">'+staff.title+'</desc></h2>',
                content:'<div><div class="span9"><hr style="width:100%;"></div><div class="row"><p class="col-md-7 col-sm-7 col-xs-7"><img src="'+staff.imagePath+'" title="'+staff.name+'" style="max-width:45vw;"></p><div class="col-md-5 col-sm-5 col-xs-5" style="margin-top:0px"><p style="margin-bottom:1.7%"><i class="fa fa-map-'+of+'"></i> '+staff.office+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+ph+'"></i> '+staff.phone+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+em+'"></i> '+staff.email+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+we+'"></i> '+staff.website+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+tw+'"></i> '+staff.twitter+'</p><p style="margin-bottom:1.7%"><i class="fa fa-'+fb+'"></i> '+staff.facebook+'</p></div></div></div>',
                animationBounce: 2.0,
                animationSpeed: 600,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"80%",
                titleClass : "g-text-center--xs"                     
             }); 
         })
          
    }) 
    
   $('.staff').css({display:'none'});  // Initially as "Faculty" Tab is selected, we wont be showing "Staff" Info
    
    
})
    

// Retrieve Information about resources work  (coopEnrollment)
    
  xhr('get',{path:"/resources/"}).done(function(res){

    var resources = ['Co-op Enrollment','Forms','Tutor / Lab-Information','Minors and Immersions','Student Advising Services','Student Ambassadors','Study Abroad'];
      
      var ima = ['http://ist.rit.edu/assets/img/resources/current_co-op.jpg','http://ist.rit.edu/assets/img/resources/current_forms.jpg','http://ist.rit.edu/assets/img/resources/current_tutors_lab.jpg','http://ist.rit.edu/assets/img/resources/current_minors_immersions.jpg','http://ist.rit.edu/assets/img/resources/current_student_advising.jpg','http://ist.rit.edu/assets/img/resources/current_student_amb.jpg','http://ist.rit.edu/assets/img/resources/current_study_abroad.jpg']
      
    $.each(resources,function(i,item){
        
         var y = '<div class="view rs view-sixth col-md-4 col-xs-4"  id="coop'+i+'" style = "min-height:37vh;z-index: 1;position:relative;transition: transform .7s ease;"><h6 class="hd" style="background :#ee6557;margin-top: 65%;border-radius: 20%;padding-top: 3%;padding-bottom: 3%;color: whitesmoke">'+item+'</h6><div class="mask lab" style="background:  rgba(146, 96, 91, 0.78);cursor:pointer"><p></p><a  class="info" style="background: #020317">Read More</a><h2 style="background :#ee6557;margin: 0%;width: 100%;margin-top: 32%;border-radius: 20%;padding-top: 3%;padding-bottom: 3%;color: whitesmoke"> '+item+'</h2></div></div>'
       
        $('#resource1').append(y);
        
        $('.rs').eq(i+2).css({'background': 'url('+ima[i]+')'});
        
        $('.lab').eq(i).hover(function(){
       
         $('.hd').eq(i).css({background:'transparent',color:'transparent'}); 
          
        },function(){
          
            $('.hd').eq(i).css({background:'#ee6557',color:'whitesmoke'}); 
            
      })
        
    })  
      
  
      
      
     
    var z="";
      
      // Collect info about Coop
   $.each(res.coopEnrollment.enrollmentInformationContent,function(i,item)
      {
         
      z+='<h5>'+item.title+'</h5><p style="font-size:13px">'+item.description+'</p>';
 
      })        
       
      
          $("#coop0").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.coopEnrollment.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div>'+z+'</div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      // Collect Info about Forms
     var a = ""; 
      a = '<h5>Graduate Forms</h5><ul>'
       $.each(res.forms.graduateForms,function(j,item1)
      {  
          a+='<li><a href="http://ist.rit.edu/'+item1.href+'">'+item1.formName+'</a></li>';
           
       }) 
     
     a+='</ul>'
        $.each(res.forms.undergraduateForms,function(k,item2)
      {  
           a = a+'<h5>Undergraduate Forms</h5><ul><li><a href="http://ist.rit.edu/'+item2.href+'">'+item2.formName+'</a></li></ul>';           
       }) 
      
      $("#coop1").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Forms</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div>'+a+'</div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })   
      
      var b = "";
       //Collect Tutor Info   
      
           b = b+'<h5>Tutor and Lab Information</h5><ul><li>'+res.tutorsAndLabInformation.description+'</li></ul>';        
      
      $("#coop2,#tutor1").on('click',function(){
     
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.tutorsAndLabInformation.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div style="font-size:13px">'+b+'</div><a href='+res.tutorsAndLabInformation.tutoringLabHoursLink+'>Tutoring Hours Schedule</a>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })  
      
      // Collect Info for Course Enrollment
      
      var c='<h5>'+res.studentServices.istMinorAdvising.title+'</h5>';
      
     
   $.each(res.studentServices.istMinorAdvising.minorAdvisorInformation,function(l,item3)
      {
         
     
       
        c +='<p>'+item3.title+'</p><ul style="margin-top:0%"><li>Name:'+item3.advisor+'</li><li>Email: '+item3.email+'</li></ul>';
 
      })        
       
      
          $("#coop3").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.studentServices.istMinorAdvising.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div>'+c+'</div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      // Collect Info for Student Advising Services
      
      var d='<h5>'+res.studentServices.istMinorAdvising.title+'</h5>';
      
      
   $.each(res.studentServices.istMinorAdvising.minorAdvisorInformation,function(l,item3)
      {
          
        d +='<p>'+item3.title+'</p><ul style="margin-top:0%"><li style="margin-top:0%">Name:'+item3.advisor+'</li><li style="margin-top:0%">Email: '+item3.email+'</li></ul>';
 
      })        
       
    var e='<h5>'+res.studentServices.professonalAdvisors.title+'</h5>';
      
      
   $.each(res.studentServices.professonalAdvisors.advisorInformation,function(l,item3)
      {
          
        e +='<p>'+item3.department+'</p><ul style="margin-top:0%"><li>Name:'+item3.name+'</li><li>Email: '+item3.email+'</li></ul>';
 
      })    
      
          $("#coop4").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.studentServices.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<h5>'+res.studentServices.academicAdvisors.title+'</h5><p>'+res.studentServices.academicAdvisors.description+'</p></div><br><div><h5>'+res.studentServices.facultyAdvisors.title+'</h5><p>'+res.studentServices.facultyAdvisors.description+'</p></div><div>'+d+'</div><br><div>'+e+'</div><br><div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"85%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
       var z="";
      
      // Collect info about Ambassador
   $.each(res.studentAmbassadors.subSectionContent,function(i,item)
      {
         
      z+='<h5>'+item.title+'</h5><p style="font-size:13px">'+item.description+'</p>';
 
      })        
       
      
          $("#coop5").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.studentAmbassadors.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div>'+z+'</div><p>Application Link: <a href = '+res.studentAmbassadors.applicationFormLink+'>'+res.studentAmbassadors.applicationFormLink+'</a></p><p style="font-size=5px">Note : '+res.studentAmbassadors.note+'</p>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      // Collect Info for Study Abroad
      
      var y="";
      
     
   $.each(res.studyAbroad.places,function(i,item)
      { 
      y+='<h5>'+item.nameOfPlace+'</h5><p style="font-size:13px">'+item.description+'</p>';
 
      })        
       
      
          $("#coop6,#abroad1").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">'+res.studyAbroad.title+'</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div style="font-size:12px;margin-bottom:15px">'+res.studyAbroad.description+'</div><div>'+y+'</div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      
      // As data for some of the resoures is not available on api, its directly inserted in dialog box
      // For Commencement
       $("#coop11").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Commencement</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div><h4>Commencement</h4><p>The spring commencement ceremony typically happens during the third week of May. Every student that wants to graduate at that time must apply to graduate before April 15. Applying for graduation sets in motion a process that ensures you have met all requirements to graduate. To apply:</p><ol ><li>Log in to SIS.</li><li>Go to student center and select in the drop down menu.</li><li>Select the earliest term in which you expect to have all requirements completed (both classes and co-ops) </li></ol><p>Once you have applied, you academic advisor will perform a degree audit and email you the results. The audit will let you know if you have any requirements remaining that will impede your graduation, and if yoube able to graduate in the timeframe you expect.</p><p>Failure to apply before the April 15 deadline has lasting consequences; talk to your academic advisor if you miss this important deadline. </p></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      // For Course Enrollment
     
       $("#coop10").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Course Enrollment</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div><h4>Course Enrollment</h4><p class="featherlight-inner">Each semester has an enrollment period in which students use the Student Information System (SIS) to choose classes to take the following semester. Enrollment for spring courses typically happens in November, and enrollment for fall courses in April. Students are assigned a specific enrollment window during the enrollment period; this window is the only time (besides add/drop week) that students can enroll in courses. Check SIS for your personal enrollment window.</p><h4">Using Your Shopping Cart </h4><p >The shopping cart is designed to help students manage their course selections for the following term. It allows you to plan your schedule in advance, and makes registering for courses quicker and easier. Please note that placing a class in your shopping cart does not mean you are enrolled in that class, nor does it guarantee you a seat in that class. It is simply a tool for planning purposes.</p></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
      // Collecting Info for Transferring Course Credit
      
       $("#coop12").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Transferring Course Credit</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div><h4>Transferring Course Credit</h4><p>All course credit, whether it is from another college, AP, IB, or otherwise, must be submitted to the RIT Office of Admissions. More information about transferring credit can be found <a href="https://www.rit.edu/academicaffairs/registrar/transfer-credit" target="_blank">online</a></p></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
       // Collecting Info for Switching Majors out of IST
      
       $("#coop13").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Switching Majors out of IST</div><br><hr style="margin-top:3px;width:100%">',
                content: '<div><h4>Switching Majors out of IST</h4><p>If you wish to change your major to one outside of IST, your first step is to schedule an appointment with an advisor from the major youclike to enter. They will be the best resource to help you decide if the major is right for you. They will also alert you to any additional materials youll need to prepare in order to switch majors into their department. (For example, IST requires a written statement from all change of program applicants).Next, meet with your current academic advisor in IST, and they will complete a Change of Program form with you. The form is then sent (along with your academic file) to your new department. Your new department will then review all materials and make the final decision. You will be notified of this decision via email from your new department.</p></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
       // Collecting Info for Switching Majors into IST
      
       $("#coop14").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Switching Majors into IST </div><br><hr style="margin-top:3px;width:100%">',
                content: '<div><h4>Switching Majors into IST </h4><h4 class="featherlight-inner">Application Process</h4><p>Meet with your academic advisor in your current (home) department to complete a Change of Program Registrars form.  You will need to submit a 1-2 page written statement that answers the following questions:</p><ul><li>Why are you applying to your chosen IST major?</li><li>What are you academic strengths and weaknesses?</li><li>What areas of computing are you passionate about?</li><li>What are you future goals and/or career interests?</li><li>Why do you believe this major is the right fit for your future goals?</li></ul></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
       // Collecting Info for Switching within IST
      
       $("#coop15").click(function(){
        
         $.dialog({
                title: '<div style="color:red;text-align:center;width:100%;font-size:30px;margin-top:5%">Switching within IST</div><br><hr style="margin-top:3px;width:100%">',
                 content: '<div><h4>Switching Majors into IST </h4><h4 class="featherlight-inner">Application Process</h4><p>Meet with your academic advisor in your current (home) department to complete a Change of Program Registrars form.  You will need to submit a 1-2 page written statement that answers the following questions:</p><ul><li>Why are you applying to your chosen IST major?</li><li>What are you academic strengths and weaknesses?</li><li>What areas of computing are you passionate about?</li><li>What are you future goals and/or career interests?</li><li>Why do you believe this major is the right fit for your future goals?</li></ul></div>',
                animationBounce: 1.8,
                animationSpeed: 300,
                theme: 'light',
                useBootstrap:false,
                boxWidth:"75%",
                titleClass : "g-text-center--xs"
                     
             }); 
          })
      
       })
    var x = ['1','2','3','4','5','6','7','8'];
     
      $.each(x,function(p,item){    
          
           $('.lab5').eq(p).hover(function(){
       
         $('.hd5').eq(p).css({background:'transparent',color:'transparent'}); 
          
        },function(){
        
            $('.hd5').eq(p).css({background:'#ee6557',color:'whitesmoke'}); 
            
      })
          
      })
    
    // Retrieve Information for Footer
    
    xhr('get',{path:"/footer/"}).done(function(foot){

    
     
    var m='<h1 style = "text-align: center;color: #f36e21;font-family: geo-sans-light;">'+foot.social.title+'</h1><hr style="height: 3px;width: 350px"><div style="font-size: 15px;color: #1f1f1f"><p style="font-size: 20px;color: grey">'+foot.social.tweet+'</p><footer style="color:#f36e21">'+foot.social.by+'</footer></div><div style="padding: 2em;display: inline-block;white-space: nowrap"><a href="'+foot.social.twitter+'" target="_blank"><i class="fa fa-twitter fa-2x" style="color:blue"></i></a>&nbsp;&nbsp;<a href="'+foot.social.facebook+'" target="_blank"><i class="fa fa-facebook-square fa-2x" style="color:darkblue"></i></a></div>'
        
    $('#social').append(m)    
     
        
    var n = '<div id = "copy" class="row" style="background: linear-gradient(90deg,#04788C 10%,#07FAF5 90%);height:100px;padding:2em"><div  style="margin: 0 auto"><a href="'+foot.quickLinks[0].href+'" target="_blank" style="text-decoration: none"><button style="display: block;margin: auto;font-size: large;text-transform: capitalize;padding: .5em 2em;margin: 0 auto;background-repeat: no-repeat;border: 1px solid white;cursor: pointer;background-color: Transparent;color: whitesmoke">'+foot.quickLinks[0].title+'</button></a></div></div><div style = "background-color: black; padding: 3em; margin: auto;padding-bottom: 1em" id="last"><div class="row"><div class="col-md-3"><ul style="text-align: center;padding: 1% 0; margin-bottom: 10px;margin-top: 0; list-style-type: none;">'  
        
    
       $.each(foot.quickLinks,function(l,item6)
      { 
       n+='<li style= "padding:4px;border-bottom: solid 1px;"><a style = "color:#A3A27F" href="'+item6.href+'" target="_blank"> '+item6.title+'</a></li>';
 
      })    
       
    n += '</ul></div><div class="col-md-6" style="text-align: center;padding: 1% 0"><div class="row" style="padding-bottom: 4em">'+foot.copyright.html+'</div><div class="row" style="padding-bottom: 4em"><p><a href="http://www.rit.edu/maps/">One Lomb Memorial Drive, Rochester, NY 14623-5603</a><br>Questions or comments?<a href="http://www.rit.edu/ask/">Send us feedback.</a>Telephone: 585-475-2700</p></div></div><div class="col-md-3" ><ul style="text-align: center;padding: 1% 0; margin-bottom: 10px;margin-top: 0; list-style-type: none;"><h3 style = "color:#A3A27F">News Archives</h3><li id="new" style = "color:#A3A27F;cursor:pointer;width:30%;margin:0 auto"> All News</li></ul></div></div></div>'    
       
        $('#footer_last').after(n)  
        
    })
    
    
    

       
    });  //Document.ready end
    
   //element.children().first() 

function nestedModel(dom){
    
      // Get info about each course from IST server and store it in object for further use 
                         xhr('get',{path:"/course/courseID="+dom.id}).done(function(json5){
                         
                           $.dialog({
                            title: '<h1 style="color:#ee6557";margin-top:8px;>Minor: '+json5.title+'</h1>',
                               content: '<div class="outer"><p>'+json5.description+'</p></div>',
                               animationBounce: 1.8,
                               animationSpeed: 400,
                               theme: 'light',
                               useBootstrap:false,
                               boxWidth:"80%",
                               titleClass : "g-text-center--xs"
                     
             }); 
                         
                         
          }) 
    
}


// Funtion to build prallal axis using Parallax plugin
// input = element id,image
function buildParallax(id,image){
    
    $(id).addClass("js__parallax-window");
    $(id).css("background","url('img/1920x1080/"+image+"') 50% 0 no-repeat fixed");
    
    
}


function swapEntity(ref,type){
    
    if(type=="staff"){
        
        $('#faculty_people').css({
            
            'background-color' : '#1abc9c'
            
        })
        
         $('#staff_people').css({
            
            'background-color' : 'transparent'
            
        })
       // $('.staff').css({display:'none'});
        $('.staff').fadeOut(200);
          $('.faculty').fadeIn(200);
        
    } else {
        
        $('#staff_people').css({
            
            'background-color' : '#1abc9c'
            
        })
        
          $('#faculty_people').css({
            
            'background-color' : 'transparent'
            
        })
        
       // $('.faculty').css({display:'none'});
         $('.faculty').fadeOut(200);
         $('.staff').fadeIn(200);
    }
    
    
}

 


function direct(dom){
    
    
 if(dom.childNodes[1].id=='ic1'){
    window.open('http://www.rit.edu/programs/web-development-adv-cert','_blank');
 }
    else{
        window.open('http://www.rit.edu/programs/networking-planning-and-design-adv-cert','_blank');
    }
    
}

// AJAX UTILITY
   /// arguments :
   //// getPost - get or post
   //// d - {path:'/about/'}
   //// idForSpinner - #parent (optional) 
///use : xhr('get',{path : '/about/'}).done(function(){//code});	

	
function xhr(getPost,d){
 return  $.ajax({
     type : getPost,
	 dataType : 'json',
	 data : d ,
	 cache : false,
	 async : true,
     url : 'proxy.php',
	 beforeSend :  function(){
	  
		
	 }
  }).always(function(){
     
	
  }).fail(function(err){
     console.log(err);
  
  });
 }

// Ajax Utility for news Section

function news(getPost,d){
 return  $.ajax({
     type : getPost,
	 dataType : 'json',
	 data : d ,
	 cache : false,
	 async : true,
     url : 'proxyNews.php',
	 beforeSend :  function(){
         
		
	 }
  }).always(function(){
     
	
  }).fail(function(err){
     console.log(err);
  
  });
 }
// End of Ajax call