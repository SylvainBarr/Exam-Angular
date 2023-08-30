import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {Character, CharacterHttp} from "../../model/character.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseApiUrl: string
  constructor(private http: HttpClient) {
    this.baseApiUrl = Environment.API_URL
  }

  /*
  * function that calls the API to get a promise with a list of all the characters,
  * the number of pages, the url to request the next page and the url to request the previous page
  * it also transform the characters as we decided in the character model
   */
  getAll(page: number = 1): Promise<{ characters:  Character[], pages: number, next: string|null, prev: string|null}>{
    return firstValueFrom(
      this.http
        .get<{ results: CharacterHttp[], info: {pages: number, next: string|null, prev: string|null} }>(this.baseApiUrl+'?page='+page)
        .pipe(
          map(response => ({
            characters: response.results.map(cH => Character.fromCharacterHttpToCharacter(cH)),
            pages: response.info.pages,
            next: response.info.next,
            prev: response.info.prev
          })
        ))
    )
  }


  /*
  * Request the API to get the details of one character based on his ID
   */
  getById(characterId: number): Promise<Character>{
    return firstValueFrom(
      this.http
        .get<CharacterHttp>(this.baseApiUrl + characterId)
        .pipe(
          map(characterHttp=> Character.fromCharacterHttpToCharacter(characterHttp))
        )
    )
  }


  /*
  * Request the API to get all character based on the filter(string) send on parameter (example: '?name=rick')
   */
  getFiltered(filter: string): Promise<{ characters:  Character[], pages: number, next: string|null, prev: string|null}>{
    return firstValueFrom(
      this.http
        .get<{ results: CharacterHttp[], info: {pages: number, next: string|null, prev: string|null} }>(this.baseApiUrl+filter)
        .pipe(
          map(response => ({
              characters: response.results.map(cH => Character.fromCharacterHttpToCharacter(cH)),
              pages: response.info.pages,
              next: response.info.next,
              prev: response.info.prev
            })
          ))
    )
  }

  update(id: number, characterUpdated: Omit<Character, "id" | "location" | "url" | "origin" | "episode" | "created">) {
    return new Promise<void>(
      (res)=>{
        let message = 'Character id '+id+' has been updated'
        console.log(message)
        res()
      }
    )
  }

  create(newCharacter: Omit<Character, "id" | "location" | "url" | "origin" | "episode" | "created">) {
    return new Promise<void>(
      (res)=>{
        let message = 'New character has been created'
        console.log(message)
        res()
      }
    )
  }

  delete(characterId: number) {
    return new Promise<void>(
      (res)=>{
        let message = 'Character id '+characterId+' has been deleted'
        console.log(message)
        res()
      }
    )
  }
}
