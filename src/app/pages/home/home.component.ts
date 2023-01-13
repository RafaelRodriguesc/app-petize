import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = ''
  error: boolean = false

  constructor(
    private apiGit: GithubService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  searchUser() : void {
    console.log("username: ", this.username)
    this.apiGit.loadUser(this.username).subscribe( (result) => {
      console.log(result.name)
      const params = result.name

      this.route.navigate(['content'], { queryParams: { username: this.username } })
    },
    (err) => {
      console.log(err);
      if(err.ok === false) {
        this.error = true
        setTimeout( () => {
          this.username = ''
          this.error = false
        }, 3000)
      }
    });
    // this.apiGit.loadRepositories(this.username).subscribe( (result: string) => console.log("repositorios", result))
  }
}
