import _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { SectionsService } from '../../services/sections.service';
import { Campo, Catalogo, Seccione } from '../../interfaces/sections.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ModalConfig } from '../modal/modal.config';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  /* Variables */
  currentSection?: number;

  isError: Boolean = false;

  idSection?: number;

  idCatalog?: number;

  /* Objects */
  sections?: Campo[];

  catalogs?: Catalogo[] = [];

  payload?: any = {};

  listSections: number [] = [
    1, 2, 3, 4, 5
  ];

  //! Configuracación de modal
  public modalConfig: ModalConfig = {
    data: {},
    modalTitle: "Seccion - Catalogos",
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    geData: (data: any) => {
      return data;
    }
  }

  /* Forms */
  form: FormGroup;

  /* Input/Output */
  @ViewChild('modal') private modal?: ModalComponent

  constructor(
    private sectionService: SectionsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkSection: this.formBuilder.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    /* Realiza la petición al servicio de sección y obtiene la data */
    this.currentSection = 1;

    this.payload = {};

    this.selectSection(this.currentSection);
  }

  get field() {return this.form.controls;}

  selectSection(event: any) {
    let sectionId = _.isNumber(event) ? event : +event;

    console.log(sectionId);
    

    if (_.isEqual(sectionId, 0)) {
      this.sections = [];
    } else {
      this.sectionService.getSection(sectionId).subscribe(
        data => {
          this.sections = data.secciones[0].campos;
        },
        error => {
          throw new Error(error);
        }
      );
    }
  }

  async onCheckBoxChange(event: any, obj: any) {
    const {value, checked} = event.target;
    const checkSection: FormArray = this.form.get('checkSection') as FormArray;

    console.log('CHECKED: ', checked, 'VALUE: ', value, obj);

    if (checked && _.has(obj, 'catalogo')) {
      this.payload = {idCampo: value, catalogs: []};
      this.modal?.open(obj);
    } else if (checked) {
      if (_.has(obj, 'id_valor')) {
        this.payload.catalogs.push(value);

        checkSection.push(new FormControl(this.payload));
      } else {
        checkSection.push(new FormControl({idCampo: value}));
      }
    } else {
      let index = 0;

      if (_.has(obj, 'id_valor')) {
        console.log(checkSection, value);
      }

      checkSection.controls.forEach((item) => {
        if (_.has(item.value, 'catalogs')) {
          if (_.isEqual(item.value.idCampo, value)) {
            checkSection.removeAt(index);
            return;
          } else if (_.includes(item.value.catalogs, value)) {
            item.value.catalogs = _.filter(item.value.catalogs, catalog => catalog !== value);
            return;
          }
        } else if (_.isEqual(item.value.idCampo, value)) {
          checkSection.removeAt(index);
          return;
        }
        index++;
      });
    }
  }

  submitForm() {
    console.log(_.uniqBy(this.form.value.checkSection, 'idCampo'));
  }

}

