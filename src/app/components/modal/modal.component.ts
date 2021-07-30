import { Component, Input, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ModalConfig } from './modal.config';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  modalConfig!: ModalConfig;

  @ViewChild('modal')
  private modalContent!: TemplateRef<ModalComponent>;

  @Output()
  dismissEvent = new EventEmitter<boolean>();

  private modalRef!: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  async getData(data: any) {
    return data;
  }

  open(data: any): Promise<boolean> {
    this.modalConfig.data = data; //! Se agrega la data.
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    this.dismissEvent.emit(true);
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }

}
