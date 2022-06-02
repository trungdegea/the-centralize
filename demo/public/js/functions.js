var ids=["my-courses-section","registered-courses-section","courses-section","profile-section","become-teacher-section","course-schedule-section","new-courses-section"]

function show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "flex";
}


const page_sz=6
var glb_data=[]
var section=''

function find_courses(){
    var input=document.querySelector(".search-box input")
    // console.log(input.value)
    

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
       
        glb_data = JSON.parse(this.responseText)
        section='courses-section'
        render(1)
        input.value=''
    }

    xhtml.open("POST", "find-courses");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('keyword='+input.value);
    return false;
}



function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

function enable_edit_info(){
    document.querySelectorAll("#profile-section input").forEach(element=>{
        element.disabled=false
    })
    document.querySelector("#profile-section .btn-edit").style.display='none'
    document.querySelectorAll("#profile-section .btn").forEach(element=>{
        element.style.display='inline-block'
    })
}



function cancel_edit(){
    document.querySelectorAll("#profile-section input").forEach(element=>{
        element.disabled=true
    })

    document.querySelectorAll("#profile-section .btn").forEach(element=>{
        element.style.display='none'
    })
    document.querySelector("#profile-section .btn-edit").style.display='inline-block'
    render_profile()
}


function show_my_courses(){
    show('my-courses-section')
    
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        glb_data=JSON.parse(this.responseText)
        section='my-courses-section'
        render(1)
    }

    xhtml.open("GET", "my-courses");
    xhtml.send();

    return false;
}

function show_registered_courses(){
    show('registered-courses-section')

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        glb_data=JSON.parse(this.responseText)
        section='registered-courses-section'
        render(1)
    }

    xhtml.open("GET", "registered-courses");
    xhtml.send();

}

function render(page){

    data=''
    if((page-1)*page_sz>glb_data.length){return;}
    for(var i=(page-1)*page_sz;i<page*page_sz;i++){
        try{
            let element=glb_data[i];
            data+=`
            <div class="col-xs-12 col-sm-6 mb-30" >
                <div class="blog-post blog-style2" >
                    <div class="thumb text-center">
                        <a href="blog-details.html"><img src="assets/img/blog/6.jpg" alt="Thumbnail Image" /></a>
                    </div>
                    <div class="blog-content" >
                        <div class="rt-inner plr-35 pt-30 mb-20">
                            
                            <a href="blog-details.html">
                                <h3 class="text-capitalize"  style="height:50px;">${element.TenKhoaHoc}</h3>
                            </a>
                            
                            <p>Lớp: ${element.Lop}</p>
                            <p>Số buổi: ${element.SoBuoiDuKien}</p>
                            <p>Học Phí: ${element.HocPhi}</p>`
                            if(section==='courses-section'){
                                data+=` <button class="btn-primary btn-edit" type="button" onclick="join_course('${element.MaKH}')" style="padding: 10px;">
                                    <h6 style=" margin:0; color: aliceblue; ">Tham gia khóa học</h6>
                                </button>`
                            }if(section==='registered-courses-section'){
                                data+=` <button class="btn-primary btn-edit" type="button" onclick="show_course_schedule('${element.MaKH}')" style="padding: 10px; width:200px">
                                    <h6 style=" margin:0; color: aliceblue; ">Xem chi tiết</h6>
                                </button>`
                            }

                        data+=`</div>

                        

                        <div class="footer clearfix plr-35">
                            <div class="pull-left">
                                <h5><span>By:</span> Kuro</h5>
                            </div>
                            <div class="pull-right">
                                <h5><span>Rating:</span> 5/5</h5>
                            </div>
                        </div>
                        
                        

                    </div>
                </div>
            </div>`
        }
        catch(err){
            break
        }
    }
    document.querySelector(`#${section} .courses`).innerHTML=data
    document.querySelectorAll("#Pagination li").forEach(element=>element.className="")
    
    document.querySelectorAll("#Pagination li")[page-1].className="active"
    topFunction()
}


function join_course(MaKH){
    
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        
        
        try{
            data=JSON.parse(this.responseText)
            
            if(data.ErrorMessage){
                alert("You need to login to use this function")
                window.location.href = "/login";
            }
            else if(data){
                alert(data[0].ErrorMessage)
                
            }
        }catch(err){

        }
        show_registered_courses();
        
    }
    xhtml.open("POST", "join-course");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaKH="+MaKH);
    
}


function ThamGia(MaKH,Ngay){
    
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        console.log("tham gia rồi nhé")
        show('registered-courses-section')
    }
    xhtml.open("POST", "join-course-class");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaKH="+MaKH+"&Ngay="+Ngay);
}


function show_course_schedule(MaKH){
    show('course-schedule-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        var data=JSON.parse(this.responseText)
        render_course_detail(data)
        
    }
    xhtml.open("POST", "schedule");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaKH="+MaKH)
}



function render_course_detail(data){

    if(data.length<1){
        return  'No result'
     }
     
     var tr=''
     data.forEach(element=>{
         tr=tr+`
         <tr>
         <td scope="col" style="width: 100px;">
         <h6 style="margin:5px 0 0 0;">${element.TenKhoaHoc}</h6>
         </td>
         <td scope="col" style="width: 300px;">
         <h6 style="margin:5px 0 0 0;">${element.Ngay}</h6>
         </td>
         <td scope="col" style="width: 100px;">
         <h6 style="margin:5px 0 0 0;">${element.ThoiGian}</h6>
         </td>

         <td scope="col">
         <button type="button" class="btn-primary" onclick="ThamGia('${element.MaKH}','${element.Ngay}')" id="take-order-btn">
         <h6 style=" margin:5px 0 0 0; color: aliceblue; padding: 5px;">ThamGia</h6>
         </button>
         </td>
         </tr>
         `
     })
     document.querySelector("#course-schedule-section tbody").innerHTML=tr
}

function new_course(){
    show('new-courses-section')
}

function insert_course(){
    var course_name=document.getElementById("course_name");
    var course_grade=document.getElementById("course_grade");
    var course_class_num=document.getElementById("course_class_num");
    var course_min_student=document.getElementById("course_min_student");
    var fee=document.getElementById("fee");

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        course_name.value=""
        course_grade.value=0
        course_class_num.value=0
        course_min_student.value=0
        fee.value=0
        show_my_courses('my-course-section')
    }

    xhtml.open("POST", "insert-course");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        'course_name='+course_name.value+//
        '&course_grade='+course_grade.value+//
        '&course_class_num='+course_class_num.value+//
        '&course_min_student='+course_min_student.value+//
        '&fee='+fee.value
    );
}


function update_cert(){
    var cert_name=document.getElementById("cert_name");
    var cert_recv_date=document.getElementById("cert_recv_date");
    var cert_provider=document.getElementById("cert_provider");

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // console.log(this.responseText)
        cert_name.value=""
        cert_recv_date.value=0
        cert_provider.value=""
    }

    xhtml.open("POST", "update-cert");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        'cert_name='+cert_name.value+//
        '&cert_recv_date='+cert_recv_date.value+//
        '&cert_provider='+cert_provider.value
    );

    return false;
}


function show_profile() {
    show('profile-section')
    //document.getElementById("show-profile").style.display="block"
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        glb_data=JSON.parse(this.responseText)[0]

        render_profile()
        
    }
    xhtml.open("GET", "show-profile");
    xhtml.send();
}

function render_profile(){
    let data=glb_data
    document.querySelectorAll("#profile-section form input")[0].value=data.HoTen
    document.querySelectorAll("#profile-section form input")[1].value=new Date(data.NgaySinh).toISOString().slice(0, 10)
    document.querySelectorAll("#profile-section form input")[2].value=data.Email
    document.querySelectorAll("#profile-section form input")[3].value=data.SDT
}

function save_info(){
    let name = document.querySelectorAll("#profile-section form input")[0]
    let ntns =document.querySelectorAll("#profile-section form input")[1]
    let email =document.querySelectorAll("#profile-section form input")[2]
    let sdt =document.querySelectorAll("#profile-section form input")[3]

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        document.querySelectorAll("#profile-section input").forEach(element=>{
            element.disabled=true
        })
    
        document.querySelectorAll("#profile-section .btn").forEach(element=>{
            element.style.display='none'
        })
        document.querySelector("#profile-section .btn-edit").style.display='inline-block'
        show_profile()
    }

    xhtml.open("POST", "change-info");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        'name='+name.value+//
        '&ntns='+ntns.value+//
        '&email='+email.value+
        '&sdt='+sdt.value
    );
}
