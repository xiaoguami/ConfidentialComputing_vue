<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="选择加密方式">
            <el-select v-model="selectedCrypto" placeholder="请选择加密方式">
                <el-option v-for="(crypto, index) in CryptoOptions" :key="index" :label="crypto" :value="crypto"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="选择阶段">
            <el-select v-model="selectedPhase" placeholder="请选择阶段">
                <el-option v-for="(phase, index) in PhaseOptions" :key="index" :label="phase" :value="phase"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="选择算法">
            <el-select v-model="selectedAlgorithm" placeholder="请选择算法">
                <el-option v-for="(alg, index) in AlgorithmOptions" :key="index" :label="alg" :value="alg"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="选择位数">
            <el-select v-model="selectedBits" placeholder="请选择位数">
                <el-option v-for="(bit, index) in BitsOptions" :key="index" :label="bit" :value="bit"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="sendData">发送</el-button>
            </el-form-item>
        </el-form>

        <p>您选择的加密方式是：{{ selectedCrypto }}</p>
        <p>您选择的阶段是：{{ selectedPhase }}</p>
        <p>您选择的算法是：{{ selectedAlgorithm }}</p>
        <p>您选择的位数是：{{ selectedBits }}</p>

        
        <div v-if="XMLstring">返回的数据：{{ XMLstring }}</div>
    </div>
</template>





<script>
    import axios from "axios"
    export default {
        name: 'side',
        data(){
            return {
                selectedCrypto: "", // 选择的加密方式
                selectedPhase: "",  // 选择的阶段
                selectedAlgorithm: "", // 选择的算法
                selectedBits: "", // 选择的位数

                // 选项内容
                CryptoOptions: ["openssl", "crypto1", "crypto2", "crypto3"],
                PhaseOptions: [1, 2, 3],
                AlgorithmOptions: ["des3", "alg1", "alg2", "alg3"],
                BitsOptions: [192, 256, 512], 

                XMLstring: ""
            }
        },
        mounted() {
        },
        methods: {
            sendData() {
                var data = JSON.stringify({
                "crypto": this.selectedCrypto,
                "phase": this.selectedPhase,
                "algorithm": this.selectedAlgorithm,
                "bits": this.selectedBits
                });

                console.log("测试的token：", data);

                var config = {
                    method: 'post',
                    url: '/detect/get_result',
                    // headers: { 
                    //     'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
                    //     'Content-Type': 'application/json', 
                    //     'Accept': '*/*', 
                    //     'Host': '172.28.7.35:8080', 
                    //     'Connection': 'keep-alive'
                    // },
                    headers: { 
                        'Accept': '*/*', 
                    },
                    data : data
                };
                
                console.log("发送的config：", config);

                axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.XMLstring = JSON.stringify(response.data); // 确保this正确
                })
                .catch((error) => {
                    console.log("获取数据失败"); 
                    console.log(error);
                });
            }, 
        },
    }
</script>




<style lang='stylus'>
#remote {
}
</style>