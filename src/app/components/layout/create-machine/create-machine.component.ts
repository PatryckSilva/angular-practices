import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StatusType, TRegisterMachine } from '../../../../@types';
import { MachinesService } from '../../../services/machines.service';
import { AxiosError } from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-machine',
  imports: [
    HlmInputDirective,

    HlmButtonDirective,

    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,

    ReactiveFormsModule,

    CommonModule,
  ],
  templateUrl: './create-machine.component.html',
  styleUrl: './create-machine.component.css',
})
export class CreateMachineComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      location: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      status: this.formBuilder.control('OFF'),
    });
  }

  machinesService = inject(MachinesService);
  selectOptions = Object.keys(StatusType);
  isLoading = false;

  responseMesssage = {
    isSuccess: false,
    message: '',
  };

  showMessage(message: string, success: boolean) {
    this.responseMesssage = {
      message,
      isSuccess: success,
    };

    setTimeout(() => {
      this.responseMesssage = {
        message: '',
        isSuccess: false,
      };
    }, 3000);
  }

  async submit() {
    try {
      this.isLoading = true;
      let objToSend: TRegisterMachine;
      const { name, location, status } = this.form.getRawValue();

      objToSend = {
        name,
        location,
        status,
      };

      const response = await this.machinesService.createMachine(objToSend);
      const validatingStatusCode =
        response.statusCode >= 200 && response.statusCode < 300;

      if (!validatingStatusCode) {
        this.showMessage('❌ Erro ao criar máquina', false);
      }

      this.form.reset();
      return this.showMessage('✅ Máquina criada com sucesso', true);
    } catch (error) {
      const _error = error as AxiosError;
      this.showMessage(`❌ ${_error.message}`, false);
    } finally {
      this.isLoading = false;
    }
  }
}
