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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatusType, TRegisterMachine } from '../../../../@types';
import { MachinesService } from '../../../services/machines.service';
import { AxiosError } from 'axios';

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
  ],
  templateUrl: './create-machine.component.html',
  styleUrl: './create-machine.component.css',
})
export class CreateMachineComponent {
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      location: '',
    });
  }

  machinesService = inject(MachinesService);
  selectedStatus = 'OFF';
  selectOptions = Object.keys(StatusType);
  isLoading = false;

  responseMesssage = {
    isSuccess: false,
    message: '',
  };

  form!: FormGroup;
  formFieldsError: any = {
    name: { value: '', error: '' },
    location: { value: '', error: '' },
  };

  onSelectChange(value: any) {
    this.selectedStatus = value.target.value;
  }

  showMessage(message: string, success: boolean) {
    this.responseMesssage = {
      message,
      isSuccess: success,
    };
  }

  async submit() {
    try {
      this.isLoading = true;
      let objToSend: TRegisterMachine;
      const { name, location } = this.form.getRawValue();
      const validationName = name === '' || name.length < 3;

      if (validationName) {
        return (this.formFieldsError = {
          ...this.formFieldsError,
          name: {
            value: name,
            error: 'Nome Inválido',
          },
        });
      }

      if (!validationName) {
        this.formFieldsError = {
          ...this.formFieldsError,
          name: {
            value: '',
            error: '',
          },
        };
      }

      objToSend = {
        name,
        location,
        status: this.selectedStatus,
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
