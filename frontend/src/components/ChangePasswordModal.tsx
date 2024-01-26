import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input
} from "@nextui-org/react";
import {FaLock} from "react-icons/fa6";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, Toaster} from "react-hot-toast";
import {changePassword} from "../api/fetchUser.ts";

const isValidPassword = (password: string, confirmPassword: string): boolean => {
  if (password === null || confirmPassword === null) return false;
  return password === confirmPassword;
}

export default ({isOpen, onOpenChange, onClose} :
    {
      isOpen: boolean,
      onOpenChange: (open: boolean) => void
      onClose: () => void
    }
) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
          .required("Required")
          .min(6, "Password is too short - should be 6 chars minimum."),
      confirmPassword: Yup.string()
          .required("Required")
          .min(6, "Password is too short - should be 6 chars minimum.")
    }),
    onSubmit: async (values) => {
      if (isValidPassword(values.password, values.confirmPassword)) {
        const response = await changePassword(values.password);
        if (response.status !== 200) {
          toast.error("Something went wrong");
          return;
        } else {
          toast.success("Password changed successfully");
        }
        onClose();
      } else {
        toast.error("Password does not match");
      }
    }
  })

  return (
      <>
        <Toaster />
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
          <ModalContent>
            {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 dark:text-white">Change Password</ModalHeader>
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 mb-3">
                        <Input
                            endContent={
                              <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            className="dark:text-white"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            id="password"
                            variant="bordered"
                            {...formik.getFieldProps("password")}
                        />
                      {formik.touched.password && formik.errors.password ?
                              (<div className="text-danger text-xs mb-3">{formik.errors.password}</div>) :
                              null
                      }
                        <Input
                            endContent={
                              <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            className="dark:text-white"
                            label="Confirm Password"
                            placeholder="Enter your password again"
                            type="password"
                            id="confirmPassword"
                            variant="bordered"
                            {...formik.getFieldProps("confirmPassword")}

                        />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                          (<div className="text-danger text-xs mb-3">{formik.errors.confirmPassword}</div>) :
                          null
                      }
                        <Button type="submit" color="primary">
                          Change Password
                        </Button>
                    </form>
                  </ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  );
}
