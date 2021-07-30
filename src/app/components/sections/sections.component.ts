import _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { SectionsService } from '../../services/sections.service';
import { Campo, Catalogo, Seccione } from '../../interfaces/sections.interface';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ModalConfig } from '../modal/modal.config';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  providers: [NgbModalConfig, NgbModal]
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

  payload?: any = {idCampo: '', catalogs: []};;

  listSections: number [] = [
    1, 2, 3, 4, 5
  ];

  //! Configuracación de modal
  public modalConfig: ModalConfig = {
    data: {},
    modalTitle: "Seccion - Catalogos",
    onDismiss: () => {
      return true;
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true;
    },
    closeButtonLabel: "Close",
    getData: (data: any) => {
      return data;
    },
    disableCloseButton: () => {
      return true;
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

    this.payload = {idCampo: '', catalogs: []};;

    this.selectSection(this.currentSection);
  }

  get field() {return this.form.controls;}

  selectSection(event: any) {
    let sectionId = _.isNumber(event) ? event : +event;

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

  enableButton(bool: boolean) {
    this.modalConfig.disableCloseButton = () => {
      return bool;
    }
  }

  cleanPayload() {
    if (_.has(this.payload, 'catalogs') && this.payload.catalogs.length > 0) {
      this.payload = {};
    }
  }

  onCheckBoxChangeSeccion(event: any, obj: any, modal: any) {
    console.log('EVENT 1: ', event, 'OBJETO 1: ', obj, 'MODAL 1: ', modal);

    const {value, checked} = event.target;

    if (checked) {
      if (_.has(obj, 'catalogo')) {
        this.payload.idCampo = value;
        modal.open(obj);
      } else {
        this.payload.idCampo = value;
      }
    }
    
  }

  //** FALTA CAPTAR EL EVENTO DISMISS DEL HIJO (MODAL) PARA LIMPIAR EL PAYLOAD Y LIMPIAR EL CHECKBOX AL CERRAR EL MODAL */

  onCheckBoxChangeCampo(event: any, obj: any, modal: any) {
    console.log('EVENT 2: ', event, 'OBJETO 2: ', obj, 'MODAL 2: ', modal, 'PAYLOAD: ', this.payload);

    const {value, checked} = event.target;

    if (checked) {
      this.payload.catalogs.push(value);
      this.enableButton(false);
    } else {
      this.enableButton(true);
    }
  }

  // async onCheckBoxChange(event: any, obj: any, modal: any) {
  //   const {value, checked} = event.target;
  //   const checkSection: FormArray = this.form.get('checkSection') as FormArray;

  //   // console.log('CHECKED: ', checked, 'VALUE: ', value, 'DATA', obj, 'MODAL: ', modal);

  //   if (checked) {

  //     if (_.has(obj, 'catalogo')) {
  //       this.payload.idCampo = value; // {idCampo: value, catalogs: []};

  //       modal.open(obj);

  //     } else if (!_.has(obj, 'catalogo')) {

  //       if (_.has(obj, 'id_valor')) {

  //         this.payload.catalogs.push(value);

  //         modal.modalConfig.disableCloseButton = () => {
  //           return false;
  //         }

  //       } else {
  //         this.payload = {idCampo: value};
  //       }
  //     }
      
  //     checkSection.push(new FormControl(this.payload));

  //   } else {
  //     let index = 0;

  //     checkSection.controls.forEach((item) => {
  //       let searchValue = item.value;

  //       console.log(searchValue);
        
  //     });
  //   }
  // }

  submitForm() {
    console.log(_.uniqBy(this.form.value.checkSection, 'idCampo'));
  }

}

