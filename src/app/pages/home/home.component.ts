import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = ''

  constructor(
    private apiGit: GithubService
  ) { }

  ngOnInit(): void {
  }

  searchUser() : void {
    console.log("username: ", this.username)
    this.apiGit.loadUser(this.username).subscribe( (result: string) => console.log("result", result))
    this.apiGit.loadRepositories(this.username).subscribe( (result: string) => console.log("repositorios", result))
  }
}
