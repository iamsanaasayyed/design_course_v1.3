import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common'
import { TeenagersService } from '../../teenagers.service';

@Component({
  selector: 'app-s112079t',
  templateUrl: './s112079t.page.html',
  styleUrls: ['./s112079t.page.scss'],
})
export class S112079tPage implements OnInit {

  bg_tn="bg_purple_red"
  bg_cft="bg_purple_red"
  bg="purple_red_w8" 
  
  bookmark=0
  path=this.router.url
  audioPage="/fear-anxiety/s112079"
  toc="/fear-anxiety/s112001"
  
  screenType=localStorage.getItem("audio")
  userId:any
  moduleId=localStorage.getItem("moduleId")
  screenNumber=112079
  startTime:any
  endTime:any
  saveUsername=JSON.parse(localStorage.getItem("saveUsername"))
  avDuration=localStorage.getItem("avDuration112079")
  totalTime=localStorage.getItem("totalTime112079")
  bookmarkList=JSON.parse(localStorage.getItem("bookmarkList"))
  progName="teenagers" 
  
  constructor(private router: Router,
    private service:TeenagersService,
    private location:Location) { }
 
 
  ngOnInit() {
    if(this.saveUsername==false)
    {this.userId=JSON.parse(sessionStorage.getItem("userId"))}
    else
    {this.userId=JSON.parse(localStorage.getItem("userId"))}
 
    if(JSON.parse(sessionStorage.getItem("bookmark112079"))==0)
    this.bookmark=0
  else if(this.bookmarkList.includes(this.screenNumber)||JSON.parse(sessionStorage.getItem("bookmark112069"))==1)
    this.bookmark=1
  
   
  }
  receiveBookmark(e)
  {
    console.log(e)
   if(e==true)
    this.bookmark=1
    else
      this.bookmark=0
    sessionStorage.setItem("bookmark112066",JSON.stringify(this.bookmark))
  }
  submitProgress(){
    this.router.navigate(['/fear-anxiety/s112080'])
    this.service.submitProgressAv({
      "ScrNumber":this.screenNumber,
      "UserId":this.userId,
      "BookMark":this.bookmark,
      "ModuleId":this.moduleId,
      "screenType":this.screenType,
      "timeSpent":this.totalTime,
      "avDuration":this.avDuration
    }).subscribe(res=>
      {
        
      })
 
    
  }
  prev(){
    this.router.navigate(['/fear-anxiety/s112078'])
  }
  

}
