import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdultsService } from "../../adults.service";

@Component({
  selector: 'app-s91061',
  templateUrl: './s91061.page.html',
  styleUrls: ['./s91061.page.scss'],
})
export class S91061Page implements OnInit {

  bg_tn = "bg_blue"
  bg_cft = "bg_blue"
  bg = "blue_w11"
  hint = ""
  toc = "/external-approval/s91001"
  path = this.router.url

  userId: any
  saveUsername = JSON.parse(localStorage.getItem("saveUsername"))
  qrList = JSON.parse(localStorage.getItem("qrList"))
  moduleId = localStorage.getItem("moduleId")
  screenType = localStorage.getItem("reflection")
  screenNumber = 91061
  startTime: any
  endTime: any
  totalTime: any
  bookmark: any
  rId = 1173
  reflection: any
  reflectionA: any
  r91061 = JSON.parse(sessionStorage.getItem("r91061"))
  shared: any
  confirmed: any

  constructor(private router: Router,
    private service: AdultsService,
    private location: Location) { }

  ngOnInit() 
  {
    this.createScreen()
    this.reflectionA = this.qrList.ListOfReflection
    this.findReflection()

    if (this.saveUsername == false) { this.userId = JSON.parse(sessionStorage.getItem("userId")) }
    else { this.userId = JSON.parse(localStorage.getItem("userId")) }
    this.startTime = Date.now();
  }

  sharedForum(e) 
  {
    console.log(e)
    this.shared = e
  }

  confirmShare() 
  {
    this.confirmed = true
  }

  createScreen() 
  {
    this.service.createScreen({
      "ScrId": 0,
      "ModuleId": this.moduleId,
      "GSetID": this.screenType,
      "ScreenNo": this.screenNumber
    }).subscribe(res => {

    })
  }

  findReflection() 
  {
    for (var i = 0; i < this.reflectionA.length; i++) {
      if (this.rId == this.reflectionA[i].ReflectionId) {
        this.reflection = this.reflectionA[i].Que
        // this.optionList.push(this.questionA[i])
      }
    }
    console.log(this.reflection)
  }

  submitProgress(e) 
  {
    console.log("returned response", e)
    this.endTime = Date.now();
    this.totalTime = this.endTime - this.startTime;
    sessionStorage.setItem("r91061", JSON.stringify(e))
    this.r91061 = sessionStorage.getItem("r91061")
    console.log(this.r91061)

    this.service.submitProgressReflection({
      "ScrNumber": this.screenNumber,
      "UserId": this.userId,
      "BookMark": this.bookmark,
      "ModuleId": this.moduleId,
      "screenType": this.screenType,
      "timeSpent": this.totalTime,
      "ReflectionId": this.rId,
      "Resp": this.r91061
    }).subscribe(res => {

    },
      error => {
        console.log(error)
        this.router.navigate(['/adults/external-approval/s91062'])

      },
      () => {
        this.router.navigate(['/adults/external-approval/s91062'])
      })
  }

  previous() 
  {
    this.router.navigate(['/adults/external-approval/s91060'])
  }

  ngOnDestroy() 
  {}

}