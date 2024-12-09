import { BadgePercent, Banknote } from "lucide-react";
import { GiTakeMyMoney } from "react-icons/gi";
import { FormButtons } from ".";
import { usePriceEvent } from "../../hooks/usePriceEvent";

export const  EventPricePayment = ({ handleCancel, errors, handleModal, setRefundDetails, setErrorMessage, setIsErrorModalOpen, isEditing, toggle}) => {
    const { SUBTOTAL, DISCOUNT, TOTAL } = usePriceEvent();

    return (
    <div className="flex space-x-6 bg-gray-200 p-3 rounded-lg ">
           <section className="space-y-1 mt-3 w-52">
              <h2 className="font-bold text-xl">Cotización:</h2>
              <span className="flex space-x-1"> <Banknote /><p>Sub-Total: </p><p>L {SUBTOTAL.toFixed(2)}</p></span>
              <span className="flex space-x-1"><BadgePercent /><p> Descuento: </p><p>L {DISCOUNT.toFixed(2)}</p></span>
              <span className="flex space-x-1 items-center font-bold"><GiTakeMyMoney size={21} /><p>Total a Pagar: </p><p>L {TOTAL.toFixed(2)}</p></span>
            </section>

         {/* Inicio Botones  */}     
          <section className="grid grid-flow-row lg:grid-flow-col ">
            <FormButtons  onCancel={handleCancel} type={"create"} errors={errors} handleModal={handleModal} setErrorMessage={setErrorMessage} setRefundDetails={setRefundDetails} setIsErrorModalOpen={setIsErrorModalOpen} isEditing={isEditing} toggle={toggle}/>
          </section>
    {/* Fin Botones */
}
           </div>);
  }