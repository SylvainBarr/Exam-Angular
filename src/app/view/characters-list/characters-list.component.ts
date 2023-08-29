import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from "../../model/character.model";
import {Observable, Subscription} from "rxjs";
import {CharacterService} from "../../service/character/character.service";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy{

  characters$!: Promise<{ characters:  Character[], pages: number, next: string|null, prev: string|null}>
  charactersList!: Character[]
  actualPage!: number
  nextPage!: number
  pages!: number
  next!: string|null
  prev!: string|null
  token$!: Observable<string>
  subscriptions$!: Subscription


  constructor(private characterService: CharacterService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.token$ = this.authService.token$

    this.subscriptions$ = this.route.params
      .subscribe((e:any)=>{
        if(e.page){
          this.characters$ = this.characterService.getAll(e.page)
          this.actualPage = e.page
          this.nextPage = parseInt(e.page) + 1
        }else{
          this.characters$ = this.characterService.getAll()
          this.actualPage = 1
          this.nextPage = 2
        }
        this.characters$.then(response =>{
          this.charactersList = response.characters
          this.pages = response.pages
          this.prev = response.prev
          this.next = response.next
        })
      })

  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }

  onChangeSearch() {
    const textInput: HTMLInputElement|null = document.querySelector('.search-area')
    const filterInput : HTMLInputElement|null = document.querySelector('#filter-select')
    let searchText = textInput!.value
    let selectedFilter = filterInput!.value
    if(selectedFilter && searchText){
      if(searchText.length>=3){
        let filter = '?'+selectedFilter+'='+searchText
        this.characters$ = this.characterService.getFiltered(filter)
        this.characters$.then(response =>{
          this.charactersList = response.characters
          this.pages = response.pages
          this.prev = response.prev
          this.next = response.next
        })
      }
    }else{
      this.subscriptions$ = this.route.params
        .subscribe((e:any)=>{
          if(e.page){
            this.characters$ = this.characterService.getAll(e.page)
            this.actualPage = e.page
            this.nextPage = parseInt(e.page) + 1
          }else{
            this.characters$ = this.characterService.getAll()
            this.actualPage = 1
            this.nextPage = 2
          }
          this.characters$.then(response =>{
            this.charactersList = response.characters
            this.pages = response.pages
            this.prev = response.prev
            this.next = response.next
          })
        })
    }
  }
}
