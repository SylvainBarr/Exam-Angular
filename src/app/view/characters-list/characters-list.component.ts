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
  actualPage: number = 1
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

    // Stocking the subscription to unsubscribe on destroy, this allows the characters List to update on pagination change
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

  // Unsubscribe of the subcriptions on destroy
  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }

  /**
   * function that get the values of the filter select and the search area.
   * It verifies if the user typed at least three characters and selected a filter,
   * then calls the character service to make the right request to the API
   *
   */
  onChangeSearch() {
    const filterInput : HTMLInputElement|null = document.querySelector('#filter-select')
    let selectedFilter = filterInput!.value
    const textInput: HTMLInputElement|null = document.querySelector('.search-area')
    let searchText = textInput!.value
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
