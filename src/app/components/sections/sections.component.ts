import { Component, OnInit } from '@angular/core';
import { SectionsService } from '../../services/sections.service';
import { Campo, Catalogo } from '../../models/sections.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  /* Variables */
  currentSection: number = 1;

  /* Objects */
  sections?: Campo[];

  catalogs?: Catalogo[] = [];

  payload?: number[];

  /* Forms */
  form: FormGroup;

  constructor(
    private sectionService: SectionsService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    /* Realiza la petición al servicio de sección y obtiene la data */
    this.sectionService.getSection(this.currentSection).subscribe(
      data => {
        this.sections = data.secciones[0].campos;    
      },
      error => {
        throw new Error(error);
      }
    );
  }

  onCheckBoxChange(event: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    console.log('CHECK ARRAY: ', checkArray);
    
    // let idCampo = +event.target.value;

    // if (event.target.checked) {

    //   let data = this.sections?.filter(section => _.isEqual(section.id_campo, idCampo))[0];

    //   if (_.has(data, 'catalogo')) {
    //     console.log('MOSTRAR MODAL CON ARRAY DE VALORES');
    //   } else {
    //     this.payload?.push(idCampo);
    //   }
    // } else {
    //   console.log('FALSO: ', event.target.value);
    // }
  }

  submitForm() {
    console.log(this.form.value)
  }

}
