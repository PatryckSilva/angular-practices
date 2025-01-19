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
  machinesService = inject(MachinesService);
  selectedStatus = 'OFF';
  selectOptions = Object.values(StatusType);

  isLoadingRequest = false;

  form!: FormGroup;
  formFieldsError: any = {
    name: { value: '', error: '' },
    location: { value: '', error: '' },
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      location: '',
    });
  }

  onSelectChange(value: any) {
    this.selectedStatus = value.target.value;
  }

  async submit() {
    try {
      this.isLoadingRequest = true;
      console.log(`this.isLoadingRequest`, this.isLoadingRequest);
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

      if (response.statusCode >= 200 && response.statusCode < 300) {
        this.form.reset();
      }
    } catch (error) {
      console.log('erro ao criar maquina', error);
    } finally {
      this.isLoadingRequest = false;
      console.log(`this.isLoadingRequest`, this.isLoadingRequest);
    }
  }
}
