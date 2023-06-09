import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  fileToUpload: File = null;
  data;
  url;
  userId;
  fullname;
  email = 'test';
  userdetail = 'tset';
  imageupload;
  content = '';
  enableAlert = false;

  constructor(private onboardingService: OnboardingService, private router: Router) {
    this.userId = JSON.parse(localStorage.getItem("userId"))
  }

  ngOnInit() {
    setTimeout(() => {
      this.onboardingService.getuser(this.userId).subscribe((res) => {
        this.userdetail = res[0];
        // this.url = 'data:image/jpg;base64,' + this.userdetail['UserImage']
        this.url = this.userdetail['UserImagePath'].split('\\')[1] + '?' + (new Date()).getTime()
        this.email = this.userdetail['Email']
        let userres = JSON.parse(localStorage.getItem("loginResponse"));
        let nameupdate = localStorage.getItem(
          "nameupdate"
        );
        if (nameupdate) {
          this.fullname = nameupdate
        } else {
          this.fullname = userres['Name']
        }
      })
    }, 1000)
  }

  getFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    this.fileToUpload = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      let byte: any = reader.result;
      byte = byte.split('base64,')
      if (byte[1] !== undefined && byte[1] !== '') {
        let obj = {
          "UserID": this.userId,
          "byteArray": byte[1]
        }
        this.onboardingService.uploaderAvatar(obj).subscribe((r) => {
          if (r) {
            this.imageupload = reader.result;
          }
        })
      }
    }
  }

  closeprofileedit() {
    this.router.navigate(["/onboarding/user-profile"]);
  }

  updateUser() {
    let name = this.fullname.split(' ')
    let obj = {
      "UserID": this.userdetail['UserID'],
      "RoleID": this.userdetail['RoleId'],
      "FName": name[0],
      "LName": name[1] === undefined ? '' : name[1],
      "Email": this.email
    }
    this.onboardingService.updateUser(obj).subscribe((r) => {
      console.log(r)
      if (r) {
        localStorage.setItem(
          "nameupdate",
          this.fullname
        );
        this.content = 'User profile updated successfully';
        this.enableAlert = true;
      }
    })
  }

  getAlertcloseEvent(event) {
    this.content = '';
    this.enableAlert = false;
  }
}
