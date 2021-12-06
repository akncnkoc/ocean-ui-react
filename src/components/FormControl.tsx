import React, { useState } from 'react'
import moment from 'moment'

type Props = {
  handleSubmit: (e: any) => void
  formProps?: any
  validations?: any
  render?: Function
}

interface ErrorType {
  [key: string]: string;
}

export const FormControl = ({
                              handleSubmit,
                              formProps,
                              validations,
                              render
                            }: Props) => {
  const [errors, setErrors] = useState<any>({});

  function handleChange(evt: any) {
    evt.persist();
    formProps[1]({
      ...formProps[0],
      [evt.target.name]: evt.target.value
    });
    handleValidationSingular(evt.target.name, evt.target.value);
  }

  let handleSelect = (title: string, value: string, name: string) => {
    formProps[1]({
      ...formProps[0],
      [name]: value
    });
    handleValidationSingular(name, value);
  };

  let priceHandleChange = async (
    evt: React.ChangeEvent<HTMLInputElement>,
    name: string,
    maskedvalue: string,
    floatvalue: number
  ) => {
    formProps[1]({
      ...formProps[0],
      [name]: floatvalue
    });
    handleValidationSingular(name, floatvalue);
  };

  function handleValidationSingular(name: any, value: string | number) {
    let beforeErrors: Array<ErrorType> = { ...errors };
    if (formProps[0][name]) {
      if (validations[name] && validations[name].required) {
        if (validations[name].required.currency) {
          if (value === "" || value < 1) {
            beforeErrors[name] = validations[name].required["message"]
              ? validations[name].required["message"]
              : `${name} gereklidir`;
          } else {
            if (beforeErrors[name]) {
              delete beforeErrors[name];
            }
          }
        } else if (validations[name].required.date) {
          if (!moment(value).isValid()) {
            beforeErrors[name] = validations[name].required["message"]
              ? validations[name].required["message"]
              : `${name} gereklidir`;
          } else {
            if (beforeErrors[name]) {
              delete beforeErrors[name];
            }
          }
        } else {
          if (value === "" || value === "-1") {
            beforeErrors[name] = validations[name].required
              ? validations[name].required
              : `${name} gereklidir`;
          } else {
            if (beforeErrors[name]) {
              delete beforeErrors[name];
            }
          }
        }
        if (validations[name].equals) {
          Object.keys(validations[name].equals).forEach((item: any) => {
            if (
              formProps[0][item] &&
              !validations[name].equals[item].value &&
              formProps[0][item] !== validations[name].equals[item]
            ) {
              beforeErrors[item] = validations[name].equals[item]
                ? validations[name].equals[item]
                : `${name} gereklidir`;
            } else if (
              formProps[0][item] &&
              validations[name].equals[item].gt &&
              !validations[name].equals[item].lt &&
              formProps[0][item] <= validations[name].equals[item].value
            ) {
              beforeErrors[item] = validations[name].equals[item].message
                ? validations[name].equals[item].message
                : `${name} gereklidir`;
            } else if (
              formProps[0][item] &&
              !validations[name].equals[item].gt &&
              validations[name].equals[item].lt &&
              formProps[0][item] >= validations[name].equals[item].value
            ) {
              beforeErrors[item] = validations[name].equals[item].message
                ? validations[name].equals[item].message
                : `${name} gereklidir`;
            } else if (
              formProps[0][item] &&
              !validations[name].equals[item].gt &&
              !validations[name].equals[item].lt &&
              formProps[0][item] !== validations[name].equals[item].value
            ) {
              beforeErrors[item] = validations[name].equals[item].message
                ? validations[name].equals[item].message
                : `${name} gereklidir`;
            } else {
              if (beforeErrors[item]) {
                delete beforeErrors[item];
              }
            }
          });
        }
      }
      setErrors(beforeErrors);
    }
  }

  function handleSubmitValidation() {
    const beforeErrors: any = {};
    setErrors([]);
    Object.keys(validations).forEach((item: any) => {
      if (formProps[0].hasOwnProperty(item)) {
        if (validations[item] && validations[item].required) {
          if (validations[item].required.currency) {
            if (
              formProps[0][item].toString().trim() === "" ||
              parseFloat(formProps[0][item]) < 1
            ) {
              beforeErrors[item] = validations[item].required["message"]
                ? validations[item].required["message"]
                : `${item} gereklidir`;
            }
          } else if (validations[item].required.date) {
            if (!moment(formProps[0][item].toString()).isValid()) {
              beforeErrors[item] = validations[item].required["message"]
                ? validations[item].required["message"]
                : `${item} gereklidir`;
            }
          } else {
            if (
              formProps[0][item].toString() === "" ||
              formProps[0][item].toString() === "-1"
            ) {
              beforeErrors[item] = validations[item].required
                ? validations[item].required
                : `${item} gereklidir`;
            }
          }
        }
        if (validations[item].equals) {
          Object.keys(validations[item].equals).map((validationItem) => {
            if (validations[item].equals[validationItem]) {
              if (
                formProps[0][validationItem] &&
                !validations[item].equals[validationItem].value &&
                formProps[0][validationItem] !==
                validations[item].equals[validationItem]
              ) {
                beforeErrors[validationItem] = validations[item].equals[
                  validationItem
                  ]
                  ? validations[item].equals[validationItem]
                  : `${validationItem} gereklidir`;
              } else if (
                formProps[0][validationItem] &&
                validations[item].equals[validationItem].gt &&
                !validations[item].equals[validationItem].lt &&
                formProps[0][validationItem] <=
                validations[item].equals[validationItem].value
              ) {
                beforeErrors[validationItem] = validations[item].equals[
                  validationItem
                  ].message
                  ? validations[item].equals[validationItem].message
                  : `${validationItem} gereklidir`;
              } else if (
                formProps[0][validationItem] &&
                !validations[item].equals[validationItem].gt &&
                validations[item].equals[validationItem].lt &&
                formProps[0][validationItem] >=
                validations[item].equals[validationItem].value
              ) {
                beforeErrors[item] = validations[item].equals[validationItem]
                  .message
                  ? validations[item].equals[validationItem].message
                  : `${validationItem} gereklidir`;
              } else if (
                formProps[0][validationItem] &&
                !validations[item].equals[validationItem].gt &&
                !validations[item].equals[validationItem].lt &&
                formProps[0][validationItem] !==
                validations[item].equals[validationItem].value
              ) {
                beforeErrors[item] = validations[item].equals[validationItem]
                  .message
                  ? validations[item].equals[validationItem].message
                  : `${validationItem} gereklidir`;
              }
            }
          });
        }
      }
      return true;
    });
    setErrors(beforeErrors);
    return Object.keys(beforeErrors).length === 0;
  }

  function handleBlur(evt: React.FocusEvent<HTMLInputElement>) {
    handleValidationSingular(evt.target.name, evt.target.value);
  }

  function handleError(val: any) {
    if (errors.length > 0 && errors[0][val]) {
      return errors[0][val];
    } else {
      return undefined;
    }
  }

  return (
    <form
      className={"w-full"}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (handleSubmitValidation()) {
          handleSubmit(e);
        }
        return false;
      }}
    >
      {render &&
        render({
          errors,
          handleChange,
          handleBlur,
          handleError,
          priceHandleChange,
          handleSelect
        })}
    </form>
  );
}
