import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputMask from "react-input-mask"
import { Grid, TextField } from "@mui/material"
import SubmitButton from "./components/submitButton/SubmitButton"
import TextInput from "./components/textInput/TextInput"
import { validationSchema } from "./utils/validationSchema"
import { useLazyGetUsersQuery } from "./store/user/user"
import Loading from "./components/loading/Loading"
import CardItem from "./components/card/Card"
import "./App.css"

export interface IFormData {
  email?: string
  number?: number
}
export interface IErrorObject {
  field?: string
  message?: string
}

function App() {
  const [getUsers, { isError, data, isFetching }] = useLazyGetUsersQuery()

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const onError: SubmitErrorHandler<IErrorObject> = (errors) => {
    console.log(errors)
  }
  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
    getUsers(data).then(() => {
      reset()
    })
  }
  return (
    <div className="App">
      <Grid container spacing={2} className="grid_container">
        <Grid xs={3}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextInput
              helperText={errors?.email?.message}
              label="Email"
              placeholder="email"
              type="text"
              register={() => register("email")}
            />
            <Controller
              name="number"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => validationSchema.isValidSync(value),
              }}
              render={({ field, fieldState }) => (
                <>
                  <InputMask
                    style={{ width: "100%" }}
                    mask="99-99-99"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.replaceAll("-", ""))
                    }
                  >
                    {
                      //@ts-ignore
                      (inputProps: any) => {
                        return (
                          <TextField
                            type="text"
                            {...inputProps}
                            helperText={errors.number?.message}
                            id="standard-error-helper-text"
                            label={"Number"}
                            variant="standard"
                          />
                        )
                      }
                    }
                  </InputMask>
                </>
              )}
            />
            <SubmitButton title="Submit form" />
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="grid_container">
        {isFetching && <Loading />}
        {isError && <h2>{isError}</h2>}
        {data?.result && data?.result?.length > 0 ? (
          data?.result?.map((elem: IFormData) => (
            <Grid
              xs={3}
              style={
                isFetching
                  ? {
                      background: "#fff",
                      opacity: "0.4",
                    }
                  : {}
              }
            >
              <CardItem data={elem} />
            </Grid>
          ))
        ) : data?.result?.length === 0 ? (
          <h2>User not found</h2>
        ) : null}
      </Grid>
    </div>
  )
}

export default App
