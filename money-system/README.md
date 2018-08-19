### 用react写一个的财务系统，系统有添加，删除，更改数据,以及计算出金额的变化

********************************************************************
## 项目主要实现功能
    
![](https://user-gold-cdn.xitu.io/2018/8/19/16552dd22e70daaa?w=989&h=580&f=gif&s=128189)

#### 创建项目

使用create-react-app创建项目基本骨架

项目结构    
![](https://user-gold-cdn.xitu.io/2018/8/19/16552d0489c02d5f?w=260&h=508&f=png&s=31017)

### Record.js 可以添加数据

    addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      //添加数据
      records: [
        ...this.state.records,
        record
      ]
    })
  }

Records.js中建立数据的表单，有修改和删除功能

### 删除 函数；使用filter
        deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) =>{
      if (recordIndex !== index) {
        return item;
      }
    });
    this.setState({
      records: newRecords
    })

  }
  
### 修改函数；使用map遍历
    updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) =>{
      if(index !== recordIndex) {
        return item;
      }
      return {
        ...item, 
        ...data
      }
      // data覆盖原来的数据
    }
  );
  
  ### 金额的变化计算，分别计算出收入输出的金额，在彼此相加，输入输出技术函数时一样的方法
   
   #### 输入金额计算函数
    credits(){
    let credits = this.state.records.filter((record) => {
      return record.amount > 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }
  
  
 