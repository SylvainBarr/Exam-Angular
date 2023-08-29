import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "../../model/character.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit{

  @Input() title!: string
  @Input() labelBtn!: string
  @Input() characterToUpdate?: Character
  @Output() formSubmitted: EventEmitter<Omit<Character, 'id'|'location'|'url'|'origin'|'episode'|'created'>> = new EventEmitter<Omit<Character, 'id'|'location'|'url'|'origin'|'episode'|'created'>>()
  characterForm!: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm()
  }


  private initForm() {
    this.characterForm = this.fb.group(
      {
        name: [
          this.characterToUpdate? this.characterToUpdate.name : '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
        ],
        status: [
          this.characterToUpdate? this.characterToUpdate.status : '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
        ],
        species: [
          this.characterToUpdate? this.characterToUpdate.species : '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
        ],
        type: [
          this.characterToUpdate? this.characterToUpdate.type : '',
          [Validators.minLength(3), Validators.maxLength(30)]
        ],
        gender: [
          this.characterToUpdate? this.characterToUpdate.gender : '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
        ],
        image: [
          this.characterToUpdate? this.characterToUpdate.image : '',
          [Validators.required, Validators.minLength(10), Validators.maxLength(250)]
        ],
      }
    )
  }


  onSubmitForm(){
    if(this.characterForm.valid){
      const {name, status, species, type, gender, image} = this.characterForm.value
      const character: Omit<Character, 'id'|'location'|'url'|'origin'|'episode'|'created'> = {
        name, status, species, type, gender, image
      }
      this.formSubmitted.emit(character)
    }
  }
}
