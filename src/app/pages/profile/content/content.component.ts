import { GithubService } from './../../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  dados: any;
  repos: any[] = []

  nome: string = ''
  seguidores: number = 0
  seguindo: number = 0
  empresa: string = ''
  localizacao: string = ''
  email: string = ''
  blog: string = ''
  twitter: string = ''
  avatar_url: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private apiGit: GithubService
  ) {
    this.dados = this.activateRoute.snapshot.queryParamMap.get('username')
   }

  ngOnInit(): void {
    this.dados = this.activateRoute.snapshot.queryParamMap.get('username')
    console.log("dados", this.dados)
    this.searchUser()
    this.searchRepos()
  }

  goBack() {
    this.router.navigate(['home'])
  }
  searchUser() : void {
    this.apiGit.loadUser(this.dados).subscribe( (result: any) => {
      console.log("Content: ", result)
      this.nome = result.name
      this.avatar_url = result.avatar_url
      this.seguidores = result.followers
      this.seguindo = result.following
      this.empresa = result.company
      this.localizacao = result.location
      this.email = result.email
      this.blog = result.blog
      this.twitter = result.twitter_username

    },
    (err) => {
      console.log(err);
      if(err.ok === false) {
        // this.error = true
        setTimeout( () => {
          // this.username = ''
          // this.error = false
        }, 3000)
      }
    });
    // this.apiGit.loadRepositories(this.username).subscribe( (result: string) => console.log("repositorios", result))
  }

  searchRepos() {
    this.apiGit.loadRepositories(this.dados).subscribe(result => {
      console.log("Content Repositorios", result)
      this.repos = result
      this.repos = this.repos.sort((a, b) => {
        if (a.stargazers_count > b.stargazers_count) {
          return -1;
        }
        if (a.stargazers_count < b.stargazers_count) {
          return 1;
        }
        return 0;
      })
    },
    (err) => {
      console.log(err);
      if(err.ok === false) {
        // this.error = true
        setTimeout( () => {
          // this.username = ''
          // this.error = false
        }, 3000)
      }
    });
  }


}
