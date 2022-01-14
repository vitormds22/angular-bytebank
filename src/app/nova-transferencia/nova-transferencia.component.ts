import { Transferencia } from './../models/transferencia.models';
import { TransferenciaService } from './../services/transferencia.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss']
})

export class NovaTransferenciaComponent {

  @Output() onTransfer = new EventEmitter<any>();
  @Output() valoresComErro = new EventEmitter<string>();

  valor: number = 0;
  destino: number = 0;

  constructor(private service: TransferenciaService, private router: Router){

  }

  transferir(){
    console.log('Solicitaçao de transferencia')

    if(this.ehValido()){
      const valorEmitir: Transferencia = {valor: this.valor, destino: this.destino};

      this.service.adicionar(valorEmitir).subscribe(
        (resultado) => {
          console.log(resultado);
          this.limparCampos();
          this.router.navigateByUrl('extrato');
        },
        (error) => console.log(error)
      );
    }

    this.limparCampos();
  }

  private ehValido(){
    const valido = this.valor > 0;

    if(!valido){
      this.valoresComErro.emit('Informe um valor valido')
    }
    return valido;
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }

}
