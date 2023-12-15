import React, { useState } from 'react'
import { useStateWithDep } from '../../../utils/hooks'
import './multiselect.scss'

export interface ElemObj {
  id: number | string
  element: string
}

interface Elements extends React.HTMLAttributes<HTMLElement> {
  elements: ElemObj[]
  multiSelect: boolean
}

interface MultiSelect extends Elements {
  multiSelect: true
  selectedList: ElemObj[] | null
  getSelectedList?: (list: ElemObj[] | null) => void
  isLastSelect?: boolean
}

interface Select extends Elements {
  multiSelect: false
  selectedElement: ElemObj | null
  getSelectedElement?: (element: ElemObj | null) => void
  isLastSelect?: boolean
}

type Props = MultiSelect | Select

export const Multiselect = (props: Props) => {
  const multiSelect = props.multiSelect
  const {
    placeholder,
    elements,
    selectedElement = !multiSelect && props.selectedElement,
    selectedList: selectedElements = multiSelect && props.selectedList,
    getSelectedElement = !multiSelect && props.getSelectedElement,
    isLastSelect,
  } = { ...props }

  const [opened, setOpened] = useState(false)
  const [selectedListState, setSelectedListState] = useStateWithDep<
    ElemObj[] | false | null
  >(selectedElements)
  const [selectedItemState, setSelectedItemState] = useStateWithDep<
    ElemObj | false | null
  >(selectedElement)

  const onClickDropDown = () => {
    setOpened(!opened)
  }

  const onSelect = (event: any, id: number | string, element: string) => {
    event.stopPropagation()
    if (multiSelect) {
      setSelectedListState(list => {
        if (!list) return [{ id: id, element: element }]
        const newList = [...list]
        const itemIndex = list.findIndex(el => el.id === id)
        if (itemIndex + 1) {
          newList.splice(itemIndex, 1)
        } else {
          newList.push({ id: id, element: element })
        }
        return newList
      })
    } else {
      setSelectedItemState({ id: id, element: element })
      setOpened(false)
      getSelectedElement &&
        selectedItemState !== false &&
        getSelectedElement({ id: id, element: element })
    }
  }

  return (
    <div className={`select ${props.className ?? ''}`}>
      <div className="select__label"></div>
      <div
        tabIndex={0}
        onBlur={() => setOpened(false)}
        className="select__wrapper"
      >
        <div
          onClick={onClickDropDown}
          className="select__input"
        >
          <div className="select__placeholder">
            {(multiSelect
              ? !selectedListState || !selectedListState.length
              : !selectedItemState) && placeholder}
          </div>
          <div className="select__selected-list-wrapper">
            <ul
              className="select__selected-list"
            >
              {multiSelect ? (
                selectedListState &&
                !!selectedListState.length &&
                selectedListState.map(selectedElem => {
                  return (
                    <li
                      onClick={event =>
                        onSelect(event, selectedElem.id, selectedElem.element)
                      }
                      key={selectedElem.id}
                      className={`select__selected-item${
                        multiSelect ? ' select__selected-item_multi' : ''
                      }`}
                    >
                      {selectedElem.element}
                    </li>
                  )
                })
              ) : (
                <li
                  className="select__selected-item"
                >
                  {selectedItemState && selectedItemState.element}
                </li>
              )}
            </ul>
          </div>
          <div
            className={`select__input-drop-down-icon${
              opened ? ' select__input-drop-down-icon_rotate' : ''
            }`}
          ></div>
        </div>

        <div
          id="select__list-wrapper"
          className={`select__list-wrapper ${
            !opened
              ? 'select__list_hidden'
              : isLastSelect
              ? 'select__last-select'
              : ''
          }`}
        >
          <ul className="select__list">
            {elements.map(item => {
              return (
                <li
                  id={`${item.id}`}
                  key={item.id}
                  className={`select__item${
                    !multiSelect &&
                    selectedItemState &&
                    selectedItemState.id === item.id
                      ? ' select__item_selected'
                      : ''
                  }`}
                  onClick={event => onSelect(event, item.id, item.element)}
                >
                  {item.element}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
