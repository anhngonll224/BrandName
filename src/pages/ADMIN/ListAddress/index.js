import { Tree } from "antd"
import { isEmpty } from "lodash"
import { useEffect } from "react"
import TooltipArrow from "src/components/Common/TooltipArrow"
// import { setListAddress, setLoading } from "src/redux/customerDirectory"
import RegionService from "src/services/RegionService"
import { ListAddressStyled } from "./styled"
import { useState } from "react"

const ListAddress = ({
  addressSelect,
  setAddressSelect,
  haveNoAddress = true,
}) => {
  const [loading, setLoading] = useState()
  const [listAddress, setListAddress] = useState()

  useEffect(() => {
    getListAddress()
  }, [])

  const getListAddress = () => {
    setLoading(true)
    RegionService.getByRegionId({ regionId: 234 })
      .then(res => {
        if (res.isOk) {
          const data = format(res.Object)
          setListAddress(data)
          if (!addressSelect?.key)
            setAddressSelect({
              key: 0,
              RegionID: 0,
              title: "Cả nước",
            })
        }
      })
      .finally(() => setLoading(false))
  }
  const format = items =>
    items.map(item => ({
      ...item,
      key: item.RegionID,
      title: item.RegionName,
      isLeaf: item.RegionLevel === 4,
    }))

  const selectAddress = (key, address) => {
    setAddressSelect(address.node)
  }
  const onLoadData = async node => {
    const res = await RegionService.getByRegionId({ regionId: node.key })
    const child = format(res.Object.filter(item => item.ParentID === node.key))
    setListAddress(updateTreeNode(listAddress, node.key, child))
  }
  const updateTreeNode = (treeData, key, children) =>
    treeData.map(node => {
      if (node.key === key) {
        return { ...node, children }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeNode(node.children, key, children),
        }
      }
      return node
    })
  return (
    <ListAddressStyled>
      {!isEmpty(listAddress) && (
        <Tree
          treeData={
            haveNoAddress
              ? [
                  {
                    key: 0,
                    RegionID: -1,
                    title: "Chưa có địa chỉ",
                    isLeaf: true,
                  },
                  {
                    key: 234,
                    RegionID: 0,
                    title: "Cả nước",
                    children: listAddress,
                  },
                ]
              : [
                  {
                    key: 234,
                    RegionID: 0,
                    title: "Cả nước",
                    children: listAddress,
                  },
                ]
          }
          defaultSelectedKeys={[234]}
          defaultExpandedKeys={[234]}
          loadData={onLoadData}
          onSelect={selectAddress}
          blockNode={true}
          titleRender={nodeData => {
            return (
              <TooltipArrow
                overlayStyle={{ maxWidth: 1000 }}
                title={nodeData.title}
                lineClamp={1}
              >
                <div>{nodeData.title}</div>
              </TooltipArrow>
            )
          }}
        />
      )}
    </ListAddressStyled>
  )
}

export default ListAddress
