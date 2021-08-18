<template>
  <div>
    <div class="col-md-12 col-sm-12 row">
      <b-button type="button" class="btn btn-sm btn-success" v-on:click="addOrder()">Yeni link</b-button>
      <b-button type="button" class="btn btn-sm btn-success" v-on:click="sendOrder()">Göndər</b-button>
    </div>
    <b-form @submit="onSubmit">
      <div class="form-container col-md-12 col-sm-12" v-for="(order, index) in orders" v-bind:key="index">
        <div class="remove" v-if="index > 0">
          <button class="btn btn-sm" v-on:click="deleteOrder(index)">Sil</button>
        </div>
        <div class="col-md-12 col-sm-12 row">
          <b-form-group :id="'input-group-1' + index"
                        label="Link:"
                        class="col-md-6"
                        :label-for="'input-1' + index">
            <b-form-input :id="'input-1' + index"
                          v-model="order.link"
                          type="text"
                          :name="'link' + index"
                          placeholder="Link"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group :id="'input-group-2' + index"
                        label="Məhsul sayı:"
                        class="col-md-2"
                        :label-for="'input-2' + index">
            <wj-input-number v-model="order.quantity"
                             :id="'input-2' + index"
                             :min="1"
                             :isRequired="true"
                             :value-changed="calculate(index)"
                             :showSpinner="false"
                             :step="1"
                             :format="'n0'">
            </wj-input-number>
          </b-form-group>
          <b-form-group :id="'input-group-3' + index"
                        label="Qiymət:"
                        class="col-md-2"
                        :label-for="'input-3' + index">
            <wj-input-number v-model="order.price"
                             :id="index"
                             :min="0.1"
                             :isRequired="true"
                             :value-changed="calculate(index)"
                             :showSpinner="false"
                             :step="0.01"
                             :format="'n2'">
            </wj-input-number>
          </b-form-group>
          <b-form-group :id="'input-group-4' + index"
                        label="Cəmi (+5%):"
                        class="col-md-2"
                        :label-for="'input-2' + index">
            <wj-input-number v-model="order.total_price"
                             :id="'input-4' + index"
                             :isReadOnly="true"
                             :showSpinner="false"
                             :format="'n2'">
            </wj-input-number>
          </b-form-group>
        </div>
        <div class="col-md-12 col-sm-12 row">
          <b-form-group id="input-group-3"
                        label="Türkiyə daxili kargo:"
                        class="col-md-3"
                        label-for="input-7">
            <b-form-select id="input-7"
                           v-model="order.cargo"
                           v-on:change="calculate(index)"
                           :options="cargoSelectOptions"
                           required>
            </b-form-select>
          </b-form-group>
          <b-form-group :id="'input-group-8' + index"
                        label="Kargo məbləği TRY:"
                        class="col-md-3"
                        :label-for="'input-8' + index">
            <wj-input-number v-model="order.cargo_price"
                             :id="'input-8' + index"
                             :min="1"
                             :isRequired="true"
                             :isReadOnly="!order.cargo"
                             :value-changed="calculate(index)"
                             :showSpinner="false"
                             :step="0.01"
                             :format="'n2'">
            </wj-input-number>
          </b-form-group>
          <b-form-group :id="'input-group-9' + index"
                        label="Rəng:"
                        class="col-md-3"
                        :label-for="'input-9' + index">
            <b-form-input id="input-9"
                          v-model="order.color"
                          placeholder="Məhsulun rəngi">
            </b-form-input>
          </b-form-group>
          <b-form-group :id="'input-group-10' + index"
                        label="Ölçü:"
                        class="col-md-3"
                        :label-for="'input-10' + index">
            <b-form-input id="input-10"
                          v-model="order.size"
                          placeholder="Məhsulun ölçüsü">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-12 col-sm-12 row">
          <b-form-group :id="'input-group-11' + index"
                        label="Qeydlər:"
                        class="col-md-12"
                        :label-for="'input-11' + index">
            <b-form-textarea :id="'textarea' + index"
                             v-model="order.notes"
                             placeholder="Məhsul haqda qeydiniz varsa bura yazın..."
                             rows="3"
                             max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import {post} from "@/service/api.service";

export default {
  name: "CreateOrder",
  data() {
    return {
      loading: false,
      orders: [
        {
          link: '',
          quantity: 0,
          price: 0,
          total_price: 0,
          cargo: false,
          cargo_price: 0,
          color: '',
          size: '',
          notes: ''
        }
      ],
      cargoSelectOptions: [
        {
          text: 'Bəli',
          value: true
        },
        {
          text: 'Xeyr',
          value: false
        }
      ]
    }
  },
  methods: {
    sendOrder() {
      this.loading = true;
      const postObject = {
        orders: this.orders,
      };
      post('order/create', postObject).subscribe(() => {
        this.loading = false;
        this.$router.push('/orders');
      }, error => this.handleError(error));
    },
    addOrder() {
      this.orders.push({
        link: '',
        quantity: '',
        price: 0,
        total_price: 0,
        cargo: false,
        cargo_price: 0,
        color: '',
        size: '',
        notes: ''
      });
    },
    deleteOrder(index) {
      this.orders.splice(index, 1);
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    calculate(index) {
      setTimeout(() => {
        this.orders[index].total_price = ((this.orders[index].price * this.orders[index].quantity) + (this.orders[index].cargo ? this.orders[index].cargo_price : 0)) * 1.05;
      }, 15);
    }
  }
}
</script>

<style scoped lang="scss">
.form-container {
  background-color: #ff910d;
  border-radius: 5px;
  padding: 20px 10px;
  margin-bottom: 10px;

  .remove {
    margin-top: -15px;
    text-align: right;
    font-weight: 700;
    cursor: pointer;

    button {
      background: red;
      color: white;
    }
  }
}
</style>
