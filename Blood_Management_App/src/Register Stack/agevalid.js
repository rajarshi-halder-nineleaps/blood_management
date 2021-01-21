setDob = (dob) => {
    this.setState({dob});
    var today = new Date();
    var birthDate = new Date(dob);
    var age= today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if(m<0 || (m === 0 && today.getDate() <birthDate.getDate())){
        age --;
    }
    if(age >=18){
        this.setState({age});
        this.setState({isValidAge: true});
        
    }
    
}
